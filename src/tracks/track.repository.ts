import { GenericRepository } from 'src/generics/generic.repository';
import { Track } from 'src/interfaces/track.interface';

class TrackRepository extends GenericRepository<Track> {}
export const trackRepository = new TrackRepository('track');
