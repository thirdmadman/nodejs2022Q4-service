import { GenericRepository } from 'src/generics/generic.repository';
import { Album } from '../interfaces/album.interface';

class AlbumRepository extends GenericRepository<Album> {
  public breakAllLinksArtistToAlbum(artistId: string) {
    const allArtists = this.findAll();
    const foundArtists = allArtists.filter(
      (album) => album.artistId === artistId,
    );
    if (foundArtists && foundArtists.length > 0) {
      for (let i = 0; i < foundArtists.length; i++) {
        this.update(foundArtists[i].id, { ...foundArtists[i], artistId: null });
      }
    }
  }
}
export const albumRepository = new AlbumRepository('album');
