import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({ format: 'UUID' })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  artistId: string | null;
  @ApiProperty()
  year: number;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
