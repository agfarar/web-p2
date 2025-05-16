import { Module } from '@nestjs/common';
import { ResenasController } from './resenas.controller';
import { ResenasService } from './resenas.service';

@Module({
  controllers: [ResenasController],
  providers: [ResenasService],
})
export class ResenasModule {}
