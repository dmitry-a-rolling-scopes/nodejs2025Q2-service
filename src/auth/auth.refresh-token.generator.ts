import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Token } from './auth.token.interface';

@Injectable()
export class RefreshTokenGenerator {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async generate(user: User): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        userId: user.id,
        login: user.login,
      } as Token,
      {
        expiresIn: this.configService.getOrThrow<string>(
          'TOKEN_REFRESH_EXPIRE_TIME',
        ),
        secret: this.configService.getOrThrow<string>('JWT_SECRET_REFRESH_KEY'),
      },
    );
  }
}
