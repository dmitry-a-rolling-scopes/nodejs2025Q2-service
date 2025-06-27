import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersProvider } from '../users/users.provider';
import { LoginDto } from './auth.login.dto';
import { LoginResponse } from './auth.login.response.dto';
import { LoginResponseFactory } from './login.response.factory';
import { User } from '../users/user.entity';

@Injectable()
export class LoginProcessor {
  constructor(
    private readonly loginResponseFactory: LoginResponseFactory,
    private readonly usersProvider: UsersProvider,
  ) {}

  public async process(loginDto: LoginDto): Promise<LoginResponse> {
    let user: User;

    try {
      user = await this.usersProvider.getByLogin(loginDto.login);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }

    const passwordValid = await user.isPasswordValid(loginDto.password);

    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    return await this.loginResponseFactory.create(user);
  }
}
