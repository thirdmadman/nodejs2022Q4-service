import { GenericRepository } from 'src/generics/generic.repository';
import { Album } from '../interfaces/album.interface';

class AlbumRepository extends GenericRepository<Album> {}
export const albumRepository = new AlbumRepository('album');
