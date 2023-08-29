import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ format: 'JWT token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
