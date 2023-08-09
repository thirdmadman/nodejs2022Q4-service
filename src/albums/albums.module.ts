import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
