import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { UUID } from '../common/uuid.type';

@Entity()
export class Artist {
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
  @IsBoolean()
  public grammy: boolean;
}
