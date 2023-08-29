import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  InternalServerErrorException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { throwException } from 'src/utils/helpers';
import { UserEntity } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiCreatedResponse({ description: 'The user has been created.' })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({ description: 'Successful operation', type: [UserEntity] })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiOkResponse({ description: 'Successful operation', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    type: 'string',
    format: 'uuid',
  })
  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const entity = await this.usersService.findOne(userId);
    return entity ?? throwException(new NotFoundException());
  }

  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: UserEntity,
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    type: 'string',
    format: 'uuid',
  })
  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const resultObj = await this.usersService.update(userId, updateUserDto);
    if (!resultObj) {
      throw new InternalServerErrorException();
    }
    if (resultObj.isPasswordMismatch) {
      throw new ForbiddenException();
    }
    if (!resultObj.entity) {
      throw new NotFoundException();
    }

    return resultObj.entity;
  }

  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not UUID)',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    type: 'string',
    format: 'uuid',
  })
  @Delete(':userId')
  @HttpCode(204)
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    const entity = await this.usersService.remove(userId);
    return entity ?? throwException(new NotFoundException());
  }
}
