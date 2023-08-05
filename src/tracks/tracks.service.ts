import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TracksService {
  prisma = new PrismaClient();

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({ data: createTrackDto });
    if (!track) return null;
    return new TrackEntity(track);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((src) => {
      if (!src) return null;
      return new TrackEntity(src);
    });
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return null;
    return new TrackEntity(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return { entity: null };
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        albumId: updateTrackDto.albumId,
        artistId: updateTrackDto.artistId,
        duration: updateTrackDto.duration,
      },
    });
    if (!updatedTrack) return null;
    return { entity: new TrackEntity(updatedTrack) };
  }

  async remove(id: string) {
    const isTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!isTrack) return null;
    const track = await this.prisma.track.delete({ where: { id } });
    if (!track) return null;
    return new TrackEntity(track);
  }
}
