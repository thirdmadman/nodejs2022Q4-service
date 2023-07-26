export class AlbumEntity {
  id: string;
  name: string;
  artistId: string | null;
  year: number;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
