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

  @ManyToOne((): typeof Artist => Artist, { eager: true, onDelete: 'SET NULL' })
  public artist: Artist | null;

  @IsOptional()
  @ManyToOne((): typeof Album => Album, { eager: true, onDelete: 'SET NULL' })
  public album: Album | null;

  @Column({ nullable: false })
  @IsNumber()
  public duration: number;
}
