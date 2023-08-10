import { GenericRepository } from 'src/generics/generic.repository';
import { Artist } from 'src/interfaces/artist.interface';

class ArtistRepository extends GenericRepository<Artist> {}
export const artistRepository = new ArtistRepository('artist');
