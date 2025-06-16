import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthProcessor } from './auth.processor';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AccessTokenGenerator } from './auth.access-token.generator';
import { RefreshTokenGenerator } from './auth.refresh-token.generator';
import { LoginResponseFactory } from './login.response.factory';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRE_TIME'),
        },
      }),
      global: true,
    }),
    UsersModule,
  ],
  providers: [
    AccessTokenGenerator,
    AuthGuard,
    AuthProcessor,
    LoginResponseFactory,
    RefreshTokenGenerator,
  ],
})
export class AuthModule {}
