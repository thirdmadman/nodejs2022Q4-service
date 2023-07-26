import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { userRepository } from './user.repository';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const currentTimestamp = Date.now();
    const newUser: User = {
      id: '',
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
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
    const user = userRepository.findOne(id);
    if (!user) return { entity: null };
    if (user.password !== updateUserDto.oldPassword) {
      return { isPasswordMismatch: true };
    }
    const updatedUser = userRepository.update(id, {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    if (!user) return null;
    return { entity: new UserEntity(updatedUser) };
  }

  remove(id: string) {
    const user = userRepository.delete(id);
    if (!user) return null;
    return new UserEntity(user);
  }
}
