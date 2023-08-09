import { Injectable } from '@nestjs/common';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FavoritesService {
  // prisma = new PrismaClient({
  //   log: [
  //     {
  //       emit: 'event',
  //       level: 'query',
  //     },
  //   ],
  // });

  constructor(private readonly prisma: PrismaService) {}

  // constructor() {
  //   this.prisma.$on('query', async (e) => {
  //     console.log(`${e.query} ${e.params}`);
  //   });
  // }

  async findAll() {
    const favoriteAlbums = await this.prisma.favoriteAlbum.findMany();
    const favoriteArtists = await this.prisma.favoriteArtist.findMany();
    const favoriteTracks = await this.prisma.favoriteTrack.findMany();

    const result: FavoriteEntity = {
      artists: new Array<ArtistEntity>(),
      albums: new Array<AlbumEntity>(),
      tracks: new Array<TrackEntity>(),
    };

    for (let i = 0; i < favoriteAlbums.length; i++) {
      const album = await this.prisma.album.findUnique({
        where: { id: favoriteAlbums[i].albumId },
      });
      if (album) {
        result.albums.push(new AlbumEntity(album));
      }
    }

    for (let i = 0; i < favoriteArtists.length; i++) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: favoriteArtists[i].artistId },
      });
      if (artist) {
        result.artists.push(new ArtistEntity(artist));
      }
    }

    for (let i = 0; i < favoriteTracks.length; i++) {
      const track = await this.prisma.track.findUnique({
        where: { id: favoriteTracks[i].trackId },
      });
      if (track) {
        result.tracks.push(new TrackEntity(track));
      }
    }

    return result;
  }

  async createFavoriteAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      return null;
    }
    const link = await this.prisma.favoriteAlbum.create({
      data: {
        userId: null,
        albumId: id,
      },
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  async removeFavoriteAlbum(albumId: string) {
    const links = await this.prisma.favoriteAlbum.findMany({
      where: { albumId },
    });
    if (!links) return null;
    for (let i = 0; i < links.length; i++) {
      await this.prisma.favoriteAlbum.delete({
        where: { id: links[i].id },
      });
    }
    return true;
  }

  async createFavoriteArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      return null;
    }
    const link = await this.prisma.favoriteArtist.create({
      data: {
        userId: null,
        artistId: id,
      },
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  async removeFavoriteArtist(artistId: string) {
    const links = await this.prisma.favoriteArtist.findMany({
      where: { artistId },
    });
    if (!links) return null;
    for (let i = 0; i < links.length; i++) {
      await this.prisma.favoriteArtist.delete({ where: { id: links[i].id } });
    }
    return true;
  }

  async createFavoriteTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      return null;
    }
    const link = await this.prisma.favoriteTrack.create({
      data: {
        userId: null,
        trackId: id,
      },
    });
    return link ? { isSuccess: true } : { isSuccess: false };
  }

  async removeFavoriteTrack(id: string) {
    const links = await this.prisma.favoriteTrack.findMany({
      where: { trackId: id },
    });
    if (!links) return null;

    for (let i = 0; i < links.length; i++) {
      await this.prisma.favoriteTrack.delete({ where: { id: links[i].id } });
    }
    return true;
  }
}
