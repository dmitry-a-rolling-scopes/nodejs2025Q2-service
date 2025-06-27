import { IsUUID } from 'class-validator';
import { UUID as UUIDType } from './uuid.type';
import { Expose } from 'class-transformer';

export class UUID {
  @IsUUID('4')
  @Expose({ name: 'id' })
  public value: UUIDType;
}
