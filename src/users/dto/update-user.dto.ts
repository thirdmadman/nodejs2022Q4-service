import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({ example: 'newpassword' })
  @IsString()
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
