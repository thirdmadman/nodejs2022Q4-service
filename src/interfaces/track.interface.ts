import { GenericEntity } from 'src/generics/generic.entity';

export interface Track extends GenericEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
