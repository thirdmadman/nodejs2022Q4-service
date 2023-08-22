import { Favorite } from 'src/db/interfaces/favorite.interface';
import { Album } from 'src/db/interfaces/album.interface';
import { Artist } from 'src/db/interfaces/artist.interface';
import { Track } from 'src/db/interfaces/track.interface';
import { User } from 'src/db/interfaces/user.interface';

export interface DB {
  user: Array<User>;
  artist: Array<Artist>;
  album: Array<Album>;
  track: Array<Track>;
  favorite: Array<Favorite>;
}
export const db: DB = {
  user: Array<User>(),
  artist: Array<Artist>(),
  album: Array<Album>(),
  track: Array<Track>(),
  favorite: Array<Favorite>(),
};
