import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User as UserInterface } from '../users/user.interface';
import { UsersMapper } from '../users/users.mapper';
import { UsersProcessor } from '../users/users.processor';
import { SignupDto } from './auth.signup.dto';
import { LoginDto } from './auth.login.dto';
import { RefreshDto } from './auth.refresh.dto';
import { LoginResponse } from './auth.login.response.dto';
import { LoginProcessor } from './auth.login.processor';
import { RefreshProcessor } from './auth.refresh.processor';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginProcessor: LoginProcessor,
    private readonly refreshProcessor: RefreshProcessor,
    private readonly usersMapper: UsersMapper,
    private readonly usersProcessor: UsersProcessor,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(
    @Body() signupDto: SignupDto,
  ): Promise<Partial<UserInterface>> {
    const user = await this.usersProcessor.create(signupDto);

    return this.usersMapper.map(user);
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.loginProcessor.process(loginDto);
  }

  @Post('refresh')
  public async refresh(@Body() refreshDto: RefreshDto): Promise<LoginResponse> {
    return await this.refreshProcessor.process(refreshDto);
  }
}
