import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const currentTimestamp = new Date();

    const user = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      },
    });
    if (!user) return null;
    const convertedUser = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return new UserEntity(convertedUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((src) => {
      if (!src) return null;
      const convertedUser = {
        ...src,
        createdAt: src.createdAt.getTime(),
        updatedAt: src.updatedAt.getTime(),
      };
      return new UserEntity(convertedUser);
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    const convertedUser = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return new UserEntity(convertedUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return { entity: null };
    if (user.password !== updateUserDto.oldPassword) {
      return { isPasswordMismatch: true };
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });
    if (!updatedUser) return null;
    const convertedUser = {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
    return { entity: new UserEntity(convertedUser) };
  }

  async remove(id: string) {
    const isUser = await this.prisma.user.findUnique({ where: { id } });
    if (!isUser) return null;

    const user = await this.prisma.user.delete({ where: { id } });
    if (!user) return null;
    const convertedUser = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return new UserEntity(convertedUser);
  }
}
