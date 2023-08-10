import { albumRepository } from './../albums/album.repository';
import { artistRepository } from './artist.repository';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { trackRepository } from 'src/tracks/track.repository';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    const artist = artistRepository.create({
      ...createArtistDto,
      id: '',
    });
    if (!artist) return null;
    return new ArtistEntity(artist);
  }

  findAll() {
    return artistRepository.findAll().map((src) => {
      if (!src) return null;
      return new ArtistEntity(src);
    });
  }

  findOne(id: string) {
    const artist = artistRepository.findOne(id);
    if (!artist) return null;
    return new ArtistEntity(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artistRepository.findOne(id);
    if (!artist) return { entity: null };
    const updatedUser = artistRepository.update(id, {
      ...artist,
      grammy: updateArtistDto.grammy,
      name: updateArtistDto.name,
    });
    if (!updatedUser) return null;
    return { entity: new ArtistEntity(updatedUser) };
  }

  remove(id: string) {
    trackRepository.breakAllLinksTrackToArtist(id);
    albumRepository.breakAllLinksArtistToAlbum(id);
    const artist = artistRepository.delete(id);
    if (!artist) return null;
    return new ArtistEntity(artist);
  }
}
