import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleOptions,
    TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService<AllConfigType>) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const isProd =
            this.configService.get('app.nodeEnv', { infer: true }) === 'production';
        const databaseType = this.configService.get('database.type', {
            infer: true,
        }) as DataSourceOptions['type'];

        return {
            type: databaseType,
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', { infer: true }),
            password: this.configService.get<string>('database.password', { infer: true }),
            database: this.configService.get('database.name', { infer: true }),

            autoLoadEntities: true,
            synchronize: this.configService.get('database.synchronize', {
                infer: true,
            }),

            logging: !isProd,

            extra: {
                connectionLimit: this.configService.get(
                    'database.maxConnections',
                    { infer: true },
                ),
            },

            charset: 'utf8mb4',
        } as TypeOrmModuleOptions;
    }
}