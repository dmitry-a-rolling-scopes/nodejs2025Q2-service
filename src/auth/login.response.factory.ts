import { User } from '../users/user.entity';
import { LoginResponse } from './auth.login.response.dto';
import { AccessTokenGenerator } from './auth.access-token.generator';
import { RefreshTokenGenerator } from './auth.refresh-token.generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginResponseFactory {
  constructor(
    private readonly accessTokenGenerator: AccessTokenGenerator,
    private readonly refreshTokenGenerator: RefreshTokenGenerator,
  ) {}

  public async create(user: User): Promise<LoginResponse> {
    const loginResponse = new LoginResponse();

    loginResponse.accessToken = await this.accessTokenGenerator.generate(user);
    loginResponse.refreshToken =
      await this.refreshTokenGenerator.generate(user);

    return loginResponse;
  }
}
