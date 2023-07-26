import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { userRepository } from './users.repository';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: '',
      login: createUserDto.login,
      password: createUserDto.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return new UserEntity(userRepository.create(newUser));
  }

  findAll() {
    return userRepository.findAll().map((src) => new UserEntity(src));
  }

  findOne(id: string) {
    return new UserEntity(userRepository.findOne(id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
