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
import { throwException } from 'src/utils/helpers';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return (
      this.albumsService.findOne(id) ?? throwException(new NotFoundException())
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const resultObj = this.albumsService.update(id, updateAlbumDto);
    if (!resultObj) {
      throw new InternalServerErrorException();
    }
    if (!resultObj.entity) {
      throw new NotFoundException();
    }

    return resultObj.entity;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return (
      this.albumsService.remove(id) ?? throwException(new NotFoundException())
    );
  }
}
