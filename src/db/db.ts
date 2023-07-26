import { Favorite } from './../favorites/entities/favorite.entity';
import { Track } from './../tracks/entities/track.entity';
import { Album } from './../albums/entities/album.entity';
import { Artist } from './../artists/entities/artist.entity';
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
