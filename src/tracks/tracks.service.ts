import { trackRepository } from './track.repository';
import { Injectable } from '@nestjs/common';
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: '',
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    const track = trackRepository.create(newTrack);
    if (!track) return null;
    return new TrackEntity(track);
  }

  findAll() {
    return trackRepository.findAll().map((src) => {
      if (!src) return null;
      return new TrackEntity(src);
    });
  }

  findOne(id: string) {
    const track = trackRepository.findOne(id);
    if (!track) return null;
    return new TrackEntity(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = trackRepository.findOne(id);
    if (!track) return { entity: null };
    const updatedTrack = trackRepository.update(id, {
      ...track,
      name: updateTrackDto.name,
      albumId: updateTrackDto.albumId,
      artistId: updateTrackDto.artistId,
      duration: updateTrackDto.duration,
    });
    if (!updatedTrack) return null;
    return { entity: new TrackEntity(updatedTrack) };
  }

  remove(id: string) {
    const track = trackRepository.delete(id);
    if (!track) return null;
    return new TrackEntity(track);
  }
}
