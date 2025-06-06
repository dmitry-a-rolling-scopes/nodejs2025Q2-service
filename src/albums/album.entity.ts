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

@Entity()
export class Album {
  @PrimaryColumn('uuid')
  @IsNotEmpty()
  @IsUUID('4')
  public id: UUID = randomUUID();

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @IsOptional()
  @ManyToOne((): typeof Artist => Artist, { onDelete: 'SET NULL' })
  artist: Artist | null = null;
}
