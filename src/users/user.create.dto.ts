import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public login: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
