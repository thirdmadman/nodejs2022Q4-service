import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

export class FavoriteEntity {
  artists: Array<ArtistEntity>;
  albums: Array<AlbumEntity>;
  tracks: Array<TrackEntity>;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
