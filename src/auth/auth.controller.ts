import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User as UserInterface } from '../users/user.interface';
import { UsersMapper } from '../users/users.mapper';
import { UsersProcessor } from '../users/users.processor';
import { SignupDto } from './auth.signup.dto';
import { LoginDto } from './auth.login.dto';
import { RefreshDto } from './auth.refresh.dto';
import { AuthProcessor } from './auth.processor';
import { LoginResponse } from './auth.login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authProcessor: AuthProcessor,
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
    return await this.authProcessor.login(loginDto);
  }

  @Post('refresh')
  public async refresh(@Body() refreshDto: RefreshDto): Promise<void> {
    console.log(refreshDto);

    return;
  }
}
