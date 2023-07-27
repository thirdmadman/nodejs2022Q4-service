import { artistRepository } from './../artists/artist.repository';
import { favoriteRepository } from './favorite.repository';
import { Injectable } from '@nestjs/common';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { trackRepository } from 'src/tracks/track.repository';
import { albumRepository } from 'src/albums/album.repository';

@Injectable()
export class FavoritesService {
  findAll() {
    const favoritesSource = favoriteRepository.findAll();

    if (!favoritesSource) return null;

    const result: FavoriteEntity = {
      artists: new Array<ArtistEntity>(),
      albums: new Array<AlbumEntity>(),
      tracks: new Array<TrackEntity>(),
    };

    if (favoritesSource.length === 0) {
      return result;
    }

    for (let i = 0; i < favoritesSource.length; i++) {
      const source = favoritesSource[i];
      if (source.artistId !== null) {
        const artist = artistRepository.findOne(source.artistId);
        if (artist) {
          result.artists.push(new ArtistEntity(artist));
        }
        continue;
      }
      if (source.albumId !== null) {
        const album = albumRepository.findOne(source.albumId);
        if (album) {
          result.albums.push(new AlbumEntity(album));
        }
        continue;
      }
      if (source.trackId !== null) {
        const track = trackRepository.findOne(source.trackId);
        if (track) {
          result.tracks.push(new TrackEntity(track));
        }
        continue;
      }
    }

    return result;
  }

  createFavoriteTrack(id: string) {
    const track = trackRepository.findOne(id);
    if (!track) {
      return null;
    }
    const link = favoriteRepository.create({
      id: '',
      userId: null,
      albumId: null,
      artistId: null,
      trackId: id,
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  removeFavoriteTrack(id: string) {
    const links = favoriteRepository.findAllWhere({ trackId: id });
    if (!links) return null;

    links.forEach((link) => favoriteRepository.delete(link.id));
    return true;
  }

  createFavoriteAlbum(id: string) {
    const album = albumRepository.findOne(id);
    if (!album) {
      return null;
    }
    const link = favoriteRepository.create({
      id: '',
      userId: null,
      albumId: id,
      artistId: null,
      trackId: null,
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  removeFavoriteAlbum(id: string) {
    const links = favoriteRepository.findAllWhere({ albumId: id });
    if (!links) return null;

    links.forEach((link) => favoriteRepository.delete(link.id));
    return true;
  }

  createFavoriteArtist(id: string) {
    const artist = artistRepository.findOne(id);
    if (!artist) {
      return null;
    }
    const link = favoriteRepository.create({
      id: '',
      userId: null,
      albumId: null,
      artistId: id,
      trackId: null,
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  removeFavoriteArtist(id: string) {
    const links = favoriteRepository.findAllWhere({ artistId: id });
    if (!links) return null;

    links.forEach((link) => favoriteRepository.delete(link.id));
    return true;
  }
}
