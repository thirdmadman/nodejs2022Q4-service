import { albumRepository } from './album.repository';
import { Injectable } from '@nestjs/common';
import { Album } from 'src/interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: '',
      name: createAlbumDto.name,
      artistId: createAlbumDto.artistId,
      year: createAlbumDto.year,
    };
    const album = albumRepository.create(newAlbum);
    if (!album) return null;
    return new AlbumEntity(album);
  }

  findAll() {
    return albumRepository.findAll();
  }

  findOne(id: string) {
    const album = albumRepository.findOne(id);
    if (!album) return null;
    return new AlbumEntity(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albumRepository.findOne(id);
    if (!album) return { entity: null };
    const updatedAlbum = albumRepository.update(id, {
      id: '',
      name: updateAlbumDto.name,
      artistId: updateAlbumDto.artistId,
      year: updateAlbumDto.year,
    });
    if (!updatedAlbum) return null;
    return { entity: new AlbumEntity(updatedAlbum) };
  }

  remove(id: string) {
    const album = albumRepository.delete(id);
    if (!album) return null;
    return new AlbumEntity(album);
  }
}
