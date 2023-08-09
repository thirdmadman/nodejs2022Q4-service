import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
