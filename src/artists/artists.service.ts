import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArtistsService {
  prisma = new PrismaClient();
  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({ data: createArtistDto });
    if (!artist) return null;
    return new ArtistEntity(artist);
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists.map((src) => {
      if (!src) return null;
      return new ArtistEntity(src);
    });
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return null;
    return new ArtistEntity(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return { entity: null };
    const updatedUser = await this.prisma.artist.update({
      where: { id },
      data: {
        grammy: updateArtistDto.grammy,
        name: updateArtistDto.name,
      },
    });
    if (!updatedUser) return null;
    return { entity: new ArtistEntity(updatedUser) };
  }

  async remove(id: string) {
    const isArtist = await this.prisma.artist.findUnique({ where: { id } });
    if (!isArtist) return null;

    const artistsAlbums = await this.prisma.artist
      .findUnique({ where: { id } })
      .albums();

    if (artistsAlbums && artistsAlbums.length > 0) {
      for (let i = 0; i < artistsAlbums.length; i++) {
        await this.prisma.album.update({
          where: { id: artistsAlbums[i].id },
          data: {
            artistId: null,
          },
        });
      }
    }

    const artistsTracks = await this.prisma.artist
      .findUnique({ where: { id } })
      .tracks();

    if (artistsTracks && artistsTracks.length > 0) {
      for (let i = 0; i < artistsTracks.length; i++) {
        await this.prisma.track.update({
          where: { id: artistsTracks[i].id },
          data: {
            artistId: null,
          },
        });
      }
    }

    const artist = await this.prisma.artist.delete({ where: { id } });
    if (!artist) return null;
    return new ArtistEntity(artist);
  }
}
