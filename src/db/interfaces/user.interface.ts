import { GenericEntity } from 'src/db/generics/generic.entity';

export interface User extends GenericEntity {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
