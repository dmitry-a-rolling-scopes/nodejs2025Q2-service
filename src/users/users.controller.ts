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
  UseGuards,
} from '@nestjs/common';
import { UsersProvider } from './users.provider';
import { UUID } from '../common/uuid.dto';
import { UsersProcessor } from './users.processor';
import { User as UserInterface } from './user.interface';
import { CreateUserDto } from './user.create.dto';
import { UpdatePasswordDto } from './user.password.update.dto';
import { UsersMapper } from './users.mapper';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersMapper: UsersMapper,
    private readonly usersProcessor: UsersProcessor,
    private readonly usersProvider: UsersProvider,
  ) {}

  @Get()
  public async getAll(): Promise<Partial<UserInterface>[]> {
    const users = await this.usersProvider.getAll();

    return users.map(
      (user: User): Partial<UserInterface> => this.usersMapper.map(user),
    );
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<Partial<UserInterface>> {
    const user = await this.usersProvider.get(id.value);

    return this.usersMapper.map(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<UserInterface>> {
    const user = await this.usersProcessor.create(createUserDto);

    return this.usersMapper.map(user);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<UserInterface>> {
    const user = await this.usersProcessor.update(id.value, updatePasswordDto);

    return this.usersMapper.map(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.usersProcessor.delete(id.value);
  }
}
