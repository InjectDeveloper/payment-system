import { Module } from '@nestjs/common';
import { QiwiModule } from './payments/qiwi/qiwi.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi'
import { DatabaseModule } from "./db/database.module";

@Module({
  imports: [
    QiwiModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
