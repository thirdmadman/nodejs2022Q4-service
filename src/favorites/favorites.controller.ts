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
import {
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorite movies, tracks, and books',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [FavoriteEntity],
  })
  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: "Track with id doesn't exist" })
  @ApiUnprocessableEntityResponse({
    description: 'Track already exists in favorites or could not be added',
  })
  @Post('/track/:id')
  async createFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.createFavoriteTrack(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @Delete('/track/:id')
  @HttpCode(204)
  async removeFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeFavoriteTrack(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: "Album with id doesn't exist" })
  @ApiUnprocessableEntityResponse({
    description: 'Album already exists in favorites or could not be added',
  })
  @Post('/album/:id')
  async createFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.createFavoriteAlbum(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @Delete('/album/:id')
  @HttpCode(204)
  async removeFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeFavoriteAlbum(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: "Artist with id doesn't exist" })
  @ApiUnprocessableEntityResponse({
    description: 'Artist already exists in favorites or could not be added',
  })
  @Post('/artist/:id')
  async createFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.createFavoriteArtist(id);
    if (!result) throw new UnprocessableEntityException();
    if (!result.isSuccess) throw new InternalServerErrorException();
    return result;
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @Delete('/artist/:id')
  @HttpCode(204)
  async removeFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeFavoriteArtist(id);
    if (result === null) throw new NotFoundException();
    if (!result) throw new InternalServerErrorException();
    return result;
  }
}
