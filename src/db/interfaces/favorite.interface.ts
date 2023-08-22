import { GenericEntity } from 'src/db/generics/generic.entity';

export interface Favorite extends GenericEntity {
  userId: string | null;
  artistId: string | null;
  albumId: string | null;
  trackId: string | null;
}
