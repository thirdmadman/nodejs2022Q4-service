import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'Freddie Mercury' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  grammy: boolean;
}
