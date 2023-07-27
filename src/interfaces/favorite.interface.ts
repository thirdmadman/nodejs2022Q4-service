import { GenericEntity } from 'src/generics/generic.entity';

export interface Favorite extends GenericEntity {
  userId: string | null;
  artistId: string | null;
  albumId: string | null;
  trackId: string | null;
}
