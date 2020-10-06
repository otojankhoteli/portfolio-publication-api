import {
  ConnectionOptions,
} from 'typeorm';

export const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'admin',
  schema: 'public',
  type: 'postgres',
  synchronize: true,
  logging: true,
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  entities: [
    `${__dirname}/src/entity/**/*.js`,
    `${__dirname}/src/entity/**/*.ts`,
  ],
};
