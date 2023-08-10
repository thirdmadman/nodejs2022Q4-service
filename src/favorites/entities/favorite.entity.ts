import { ApiProperty } from '@nestjs/swagger/dist';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

export class FavoriteEntity {
  @ApiProperty({ type: ArtistEntity, isArray: true })
  artists: Array<ArtistEntity>;
  @ApiProperty({ type: AlbumEntity, isArray: true })
  albums: Array<AlbumEntity>;
  @ApiProperty({ type: TrackEntity, isArray: true })
  tracks: Array<TrackEntity>;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
