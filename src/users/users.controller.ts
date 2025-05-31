import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersProvider } from './users.provider';
import { UUID } from '../common/uuid.dto';
import { UsersProcessor } from './users.processor';
import { User } from './user.interface';
import { UserDto } from './user.dto';
import { CreateUserDto } from './user.create.dto';
import { UpdatePasswordDto } from './user.password.update.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersProcessor: UsersProcessor,
    private readonly usersProvider: UsersProvider,
  ) {}

  @Get()
  public async getAll(): Promise<UserDto[]> {
    return await this.usersProvider.getAll();
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<UserDto> {
    return await this.usersProvider.get(id.value);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersProcessor.create(createUserDto);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.usersProcessor.update(id.value, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.usersProcessor.delete(id.value);
  }
}
