import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersPasswordHasher {
  constructor(private readonly configService: ConfigService) {}

  public async hash(user: User): Promise<void> {
    const rounds = this.configService.getOrThrow<number>('CRYPT_SALT');

    await user.hashPassword(rounds);
  }
}
