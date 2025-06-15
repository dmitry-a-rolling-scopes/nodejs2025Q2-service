import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersProvider } from '../users/users.provider';
import { LoginDto } from './auth.login.dto';
import { LoginResponse } from './auth.login.response.dto';

@Injectable()
export class AuthProcessor {
  constructor(
    private jwtService: JwtService,
    private usersProvider: UsersProvider,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException();
      }

      throw error;
    }

    const user = await this.usersProvider.getByLogin(loginDto.login);
    const passwordValid = await user.isPasswordValid(loginDto.password);

    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      userId: user.id,
      login: user.login,
    });

    const loginResponse = new LoginResponse();

    loginResponse.accessToken = accessToken;
    loginResponse.refreshToken = 'xxx'; // todo: rework;

    return loginResponse;
  }
}
