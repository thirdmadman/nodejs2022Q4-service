import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'The Show Must Go On' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ nullable: true, format: 'UUID' })
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @ApiProperty({ nullable: true, format: 'UUID' })
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @ApiProperty({ example: '262' })
  @IsNumber()
  @Min(0)
  duration: number; // integer number
}
