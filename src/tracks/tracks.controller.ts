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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { throwException } from 'src/utils/helpers';
import { TrackEntity } from './entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: TrackEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [TrackEntity],
  })
  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiOkResponse({ description: 'Successful operation', type: TrackEntity })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Track ID',
    type: 'string',
    format: 'uuid',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.tracksService.findOne(id);
    return entity ?? throwException(new NotFoundException());
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiOkResponse({
    description: 'The track has been updated.',
    type: TrackEntity,
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Track ID',
    type: 'string',
    format: 'uuid',
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const resultObj = await this.tracksService.update(id, updateTrackDto);
    if (!resultObj) {
      throw new InternalServerErrorException();
    }
    if (!resultObj.entity) {
      throw new NotFoundException();
    }

    return resultObj.entity;
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'id',
    description: 'Track ID',
    type: 'string',
    format: 'uuid',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = await this.tracksService.remove(id);
    return entity ?? throwException(new NotFoundException());
  }
}
