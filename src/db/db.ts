import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Album } from 'src/interfaces/album.interface';
import { Artist } from 'src/interfaces/artist.interface';
import { Track } from 'src/interfaces/track.interface';
import { User } from 'src/interfaces/user.interface';

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
