import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { throwException } from 'src/utils/helpers';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({ description: 'Album is created', type: AlbumEntity })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [AlbumEntity],
  })
  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiOkResponse({ description: 'Successful operation', type: AlbumEntity })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    type: 'string',
    format: 'uuid',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.albumsService.findOne(id);
    return entity ?? throwException(new NotFoundException());
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiOkResponse({
    description: 'The album has been updated.',
    type: AlbumEntity,
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    type: 'string',
    format: 'uuid',
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const resultObj = await this.albumsService.update(id, updateAlbumDto);
    if (!resultObj) {
      throw new InternalServerErrorException();
    }
    if (!resultObj.entity) {
      throw new NotFoundException();
    }

    return resultObj.entity;
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    type: 'string',
    format: 'uuid',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.albumsService.remove(id);
    return entity ?? throwException(new NotFoundException());
  }
}
