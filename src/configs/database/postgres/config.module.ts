import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import configuration from './configuration'
import {PostgresConfigService} from "./configs.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                POSTGRES_DB: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_PWD: Joi.string().required(),
                POSTGRES_USR: Joi.string().required(),
                POSTGRES_HOST: Joi.string().required(),
            }),
        }),
    ],
    providers: [PostgresConfigService],
    exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
