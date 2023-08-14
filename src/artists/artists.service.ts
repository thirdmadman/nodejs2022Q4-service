import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

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

    const artist = await this.prisma.artist.delete({ where: { id } });
    if (!artist) return null;
    return new ArtistEntity(artist);
  }
}
