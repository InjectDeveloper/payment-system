import { Module } from '@nestjs/common';
import { QiwiService } from './qiwi.service';
import { QiwiController } from './qiwi.controller';

import { UserModule } from "../../models/user/user.module";
import { QiwiApiModule } from "../../core/paymentsApi/qiwi/qiwi-api.module";

@Module({
  imports: [
    QiwiApiModule,
    UserModule
  ],
  providers: [QiwiService],
  controllers: [QiwiController],
})
export class QiwiModule {}
