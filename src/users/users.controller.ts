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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { throwException } from 'src/utils/helpers';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return (
      this.usersService.findOne(id) ?? throwException(new NotFoundException())
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const resultObj = this.usersService.update(id, updateUserDto);
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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return (
      this.usersService.remove(id) ?? throwException(new NotFoundException())
    );
  }
}
