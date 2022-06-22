import { Module } from '@nestjs/common';

import { UserModule } from "../../models/user/user.module";
import { QiwiApiModule } from "../../core/paymentsApi/qiwi/qiwi-api.module";
import { CryptoService } from "./crypto.service";
import { CryptoController } from "./crypto.controller";
import { CryptoApiModule } from "../../core/paymentsApi/crypto/crypto-api.module";

@Module({
  imports: [
    CryptoApiModule,
    UserModule
  ],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}
