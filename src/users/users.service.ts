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
    const user = userRepository.create(newUser);
    if (!user) return null;
    return new UserEntity(user);
  }

  findAll() {
    return userRepository.findAll().map((src) => {
      if (!src) return null;
      return new UserEntity(src);
    });
  }

  findOne(id: string) {
    const user = userRepository.findOne(id);
    if (!user) return null;
    return new UserEntity(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    const user = userRepository.delete(id);
    if (!user) return null;
    return new UserEntity(user);
  }
}
