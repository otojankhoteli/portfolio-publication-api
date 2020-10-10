export = {
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'admin',
  schema: 'public',
  type: 'postgres',
  synchronize: false,
  logging: false,
  migrations: [
    'src/migration/**/*.js',
  ],
  subscribers: [
    'src/subscriber/**/*.js',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  entities: [
    'src/entity/**/*.js',
  ],
};
