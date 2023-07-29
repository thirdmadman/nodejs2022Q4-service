import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({ format: 'UUID' })
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true, format: 'UUID' })
  artistId: string | null; // refers to Artist
  @ApiProperty({ nullable: true, format: 'UUID' })
  albumId: string | null; // refers to Album
  @ApiProperty()
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
