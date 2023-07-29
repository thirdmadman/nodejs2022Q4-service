import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ example: 'Freddie Mercury' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  grammy: boolean;
}
