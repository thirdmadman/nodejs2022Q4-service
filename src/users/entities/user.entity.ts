import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty({ format: 'UUID' })
  id: string; // uuid v4
  @ApiProperty()
  login: string;

  @Exclude()
  password: string;

  @ApiProperty()
  version: number; // integer number, increments on update
  @ApiProperty()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
