import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

// eslint-disable-next-line no-console
console.log(process.env);

const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  ssl: process.env.DATABASE_SSL ? { rejectUnauthorized: false } : false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  subscribers: [],
});
AppDataSource.initialize();
export default AppDataSource;
