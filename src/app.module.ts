import { Module } from '@nestjs/common';
import { QiwiModule } from './payments/qiwi/qiwi.module';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi'
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";
import { CryptoModule } from "./payments/crypto/crypto.module";
import { CrystalPayModule } from "./payments/crystalPay/crystalPay.module";




@Module({
  imports: [
    QiwiModule,
    UserModule,
    CryptoModule,
    CrystalPayModule,
    PostgresDatabaseProviderModule,
  ]
})
export class AppModule {}
