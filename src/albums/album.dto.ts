import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from '../common/uuid.type';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @IsOptional()
  @IsUUID('4')
  public artistId: UUID | null;
}
