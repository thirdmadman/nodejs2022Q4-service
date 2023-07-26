import { GenericEntity } from 'src/generics/generic.entity';

export interface Artist extends GenericEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
