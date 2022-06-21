import { Module } from '@nestjs/common';
import { QiwiModule } from './payments/qiwi/qiwi.module';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi'
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";



@Module({
  imports: [
    QiwiModule,
    UserModule,
    PostgresDatabaseProviderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
