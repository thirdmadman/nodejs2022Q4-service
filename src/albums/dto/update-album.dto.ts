import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ example: 'Innuendo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1991' })
  @IsNumber()
  @Min(0)
  year: number;

  @ApiProperty({ nullable: true, format: 'UUID' })
  @IsString()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
