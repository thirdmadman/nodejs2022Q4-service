import { GenericRepository } from 'src/generics/generic.repository';
import { Track } from 'src/interfaces/track.interface';

class TrackRepository extends GenericRepository<Track> {
  public breakAllLinksTrackToAlbum(albumId: string) {
    const allTracks = this.findAll();
    const foundTracks = allTracks.filter((track) => track.albumId === albumId);
    if (foundTracks && foundTracks.length > 0) {
      for (let i = 0; i < foundTracks.length; i++) {
        this.update(foundTracks[i].id, { ...foundTracks[i], albumId: null });
      }
    }
  }

  public breakAllLinksTrackToArtist(artistId: string) {
    const allTracks = this.findAll();
    const foundTracks = allTracks.filter(
      (track) => track.artistId === artistId,
    );
    if (foundTracks && foundTracks.length > 0) {
      for (let i = 0; i < foundTracks.length; i++) {
        this.update(foundTracks[i].id, { ...foundTracks[i], artistId: null });
      }
    }
  }
}
export const trackRepository = new TrackRepository('track');
