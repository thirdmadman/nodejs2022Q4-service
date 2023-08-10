import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({ format: 'UUID' })
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
