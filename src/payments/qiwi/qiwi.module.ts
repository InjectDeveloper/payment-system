import { Module } from '@nestjs/common';
import { QiwiService } from './qiwi.service';

@Module({
  providers: [QiwiService],
})
export class QiwiModule {}
