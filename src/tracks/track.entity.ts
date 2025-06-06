import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from '../common/uuid.type';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  @IsNotEmpty()
  @IsUUID('4')
  public id: UUID = randomUUID();

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ManyToOne((): typeof Artist => Artist, { onDelete: 'SET NULL' })
  artist: Artist | null = null;

  @IsOptional()
  @ManyToOne((): typeof Album => Album, { onDelete: 'SET NULL' })
  album: Album | null = null;

  @Column({ nullable: false })
  @IsNumber()
  duration: number;
}
