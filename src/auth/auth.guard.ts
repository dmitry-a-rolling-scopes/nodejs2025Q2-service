import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
