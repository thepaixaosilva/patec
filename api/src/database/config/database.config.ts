import { registerAs } from '@nestjs/config';
import {
    IsOptional,
    IsInt,
    Min,
    Max,
    IsString,
    ValidateIf,
    IsBoolean,
} from 'class-validator';
import { DatabaseConfig } from './database-config.type';
import { DataSourceOptions } from 'typeorm';
import validateConfig from 'src/utils/validate-config';

/**
 * Environment variables validator for database configuration.
 *
 * Note: The @ValidateIf decorators receive the class instance itself as a parameter.
 * This works because class-validator applies decorators at runtime,
 * when the instance has already been created by plainToClass() with all values populated.
 * The explicit typing (envValues: EnvironmentVariablesValidator) is necessary to
 * avoid ESLint errors about unsafe member access on 'any' type.
 */
class EnvironmentVariablesValidator {
    @ValidateIf(
        (envValues: EnvironmentVariablesValidator) => !!envValues.DATABASE_URL,
    )
    @IsString()
    DATABASE_URL: string;

    @ValidateIf(
        (envValues: EnvironmentVariablesValidator) => !envValues.DATABASE_URL,
    )
    @IsString()
    DATABASE_TYPE: string;

    @ValidateIf(env => env.DATABASE_TYPE !== 'sqlite' && !env.DATABASE_URL)
    @IsString()
    DATABASE_HOST: string;

    @ValidateIf(env => env.DATABASE_TYPE !== 'sqlite' && !env.DATABASE_URL)
    @IsInt()
    @Min(0)
    @Max(65535)
    DATABASE_PORT: number;

    @ValidateIf(env => env.DATABASE_TYPE !== 'sqlite' && !env.DATABASE_URL)
    @IsString()
    DATABASE_PASSWORD: string;

    @ValidateIf(
        (envValues: EnvironmentVariablesValidator) => !envValues.DATABASE_URL,
    )
    @IsString()
    DATABASE_NAME: string;

    @ValidateIf(env => env.DATABASE_TYPE !== 'sqlite' && !env.DATABASE_URL)
    @IsString()
    DATABASE_USERNAME: string;

    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    @IsInt()
    @IsOptional()
    DATABASE_MAX_CONNECTIONS: number;
}

export default registerAs<DatabaseConfig>('database', () => {
    const validatedConfig = validateConfig(
        process.env,
        EnvironmentVariablesValidator,
    );

    return {
        url: validatedConfig.DATABASE_URL,
        type: validatedConfig.DATABASE_TYPE as DataSourceOptions['type'],
        host: validatedConfig.DATABASE_HOST,
        port: validatedConfig.DATABASE_PORT
            ? parseInt(validatedConfig.DATABASE_PORT.toString(), 10)
            : 5432,
        password: validatedConfig.DATABASE_PASSWORD,
        name: validatedConfig.DATABASE_NAME,
        username: validatedConfig.DATABASE_USERNAME,
        synchronize: true,
        maxConnections: validatedConfig.DATABASE_MAX_CONNECTIONS
            ? parseInt(validatedConfig.DATABASE_MAX_CONNECTIONS.toString(), 10)
            : 100,
    };
});