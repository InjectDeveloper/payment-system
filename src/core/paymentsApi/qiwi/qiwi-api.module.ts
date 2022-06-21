import { Module } from '@nestjs/common';
import { QiwiApiService } from "./qiwi-api.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [],
  providers: [QiwiApiService],
  exports: [QiwiApiService]
})
export class QiwiApiModule {}
