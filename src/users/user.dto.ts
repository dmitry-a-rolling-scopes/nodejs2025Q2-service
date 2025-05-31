import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UUID } from '../common/uuid.type';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  public id: UUID;

  @IsNotEmpty()
  @IsString()
  public login: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsNumber()
  public version: number;

  @IsNotEmpty()
  @IsNumber()
  public createdAt: number;

  @IsNotEmpty()
  @IsNumber()
  public updatedAt: number;
}
