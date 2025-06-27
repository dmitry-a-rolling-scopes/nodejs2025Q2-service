import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersProvider } from '../users/users.provider';
import { LoginResponse } from './auth.login.response.dto';
import { RefreshDto } from './auth.refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token } from './auth.token.interface';
import { LoginResponseFactory } from './login.response.factory';
import { User } from '../users/user.entity';

@Injectable()
export class RefreshProcessor {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly loginResponseFactory: LoginResponseFactory,
    private readonly usersProvider: UsersProvider,
  ) {}

  public async process(refreshDto: RefreshDto): Promise<LoginResponse> {
    let refreshToken: Token;
    let user: User;

    try {
      refreshToken = await this.jwtService.verifyAsync<Token>(
        refreshDto.refreshToken,
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_SECRET_REFRESH_KEY',
          ),
        },
      );
    } catch {
      throw new UnauthorizedException();
    }

    try {
      user = await this.usersProvider.get(refreshToken.userId);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }

    return await this.loginResponseFactory.create(user);
  }
}
