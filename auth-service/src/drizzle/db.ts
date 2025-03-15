import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { env } from '../config/env';

const poolConnection = mysql.createPool({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  database: env.MYSQL_DATABASE,
  password: env.MYSQL_PASSWORD,
});

export const db = drizzle({
  client: poolConnection,
});
