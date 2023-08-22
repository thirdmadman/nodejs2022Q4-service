import { GenericEntity } from 'src/db/generics/generic.entity';

export interface Album extends GenericEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
