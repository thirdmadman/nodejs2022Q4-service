import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { throwException } from 'src/utils/helpers';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return (
      this.artistsService.findOne(id) ?? throwException(new NotFoundException())
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const resultObj = this.artistsService.update(id, updateArtistDto);
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
      this.artistsService.remove(id) ?? throwException(new NotFoundException())
    );
  }
}
