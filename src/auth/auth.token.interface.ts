import { UUID } from '../common/uuid.type';

export interface Token {
  sub: UUID;
  userId: UUID;
  login: string;
}
