import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    if (!album) return null;
    return new AlbumEntity(album);
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums.map((src) => {
      if (!src) return null;
      return new AlbumEntity(src);
    });
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return null;
    return new AlbumEntity(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return { entity: null };
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        artistId: updateAlbumDto.artistId,
        year: updateAlbumDto.year,
      },
    });
    if (!updatedAlbum) return null;
    return { entity: new AlbumEntity(updatedAlbum) };
  }

  async remove(id: string) {
    const isAlbum = await this.prisma.album.findUnique({ where: { id } });
    if (!isAlbum) return null;

    const album = await this.prisma.album.delete({ where: { id } });
    if (!album) return null;
    return new AlbumEntity(album);
  }
}
