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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Add new artist', description: 'Add new artist' })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: [ArtistEntity],
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Get all artists', description: 'Gets all artists' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [ArtistEntity],
  })
  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiOkResponse({ description: 'Successful operation', type: ArtistEntity })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    type: 'string',
    format: 'uuid',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.artistsService.findOne(id);
    return entity ?? throwException(new NotFoundException());
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiOkResponse({
    description: 'The artist has been updated.',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    type: 'string',
    format: 'uuid',
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const resultObj = await this.artistsService.update(id, updateArtistDto);
    if (!resultObj) {
      throw new InternalServerErrorException();
    }
    if (!resultObj.entity) {
      throw new NotFoundException();
    }

    return resultObj.entity;
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    type: 'string',
    format: 'uuid',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.artistsService.remove(id);
    return entity ?? throwException(new NotFoundException());
  }
}
