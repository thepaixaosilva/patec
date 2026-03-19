import { DataSourceOptions } from "typeorm";

export type DatabaseConfig = {
    url?: string;
    type?: DataSourceOptions['type'];
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
    maxConnections: number;
};