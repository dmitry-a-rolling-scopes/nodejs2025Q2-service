import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from '../common/uuid.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'node:crypto';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  @IsNotEmpty()
  @IsUUID('4')
  public id: UUID = randomUUID();

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public login: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public password: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  public version: number = 1;

  @Column({ nullable: false })
  @CreateDateColumn()
  @IsNotEmpty()
  @IsNumber()
  public createdAt: Date;

  @Column({ nullable: false })
  @UpdateDateColumn()
  @IsNotEmpty()
  @IsNumber()
  public updatedAt: Date;
}
