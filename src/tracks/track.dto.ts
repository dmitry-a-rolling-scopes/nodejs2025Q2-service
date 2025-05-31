import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from '../common/uuid.type';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: UUID | null;

  @IsOptional()
  @IsUUID('4')
  albumId: UUID | null;

  @IsNumber()
  duration: number;
}
