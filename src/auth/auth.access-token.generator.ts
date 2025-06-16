import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Token } from './auth.token.interface';

@Injectable()
export class AccessTokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  public async generate(user: User): Promise<string> {
    return await this.jwtService.signAsync({
      sub: user.id,
      userId: user.id,
      login: user.login,
    } as Token);
  }
}
