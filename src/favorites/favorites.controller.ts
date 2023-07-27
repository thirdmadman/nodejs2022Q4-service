import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  createFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.createFavoriteTrack(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.removeFavoriteTrack(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  @Post('/album/:id')
  createFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.createFavoriteAlbum(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.removeFavoriteAlbum(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  @Post('/artist/:id')
  createFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.createFavoriteArtist(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favoritesService.removeFavoriteArtist(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }
}
