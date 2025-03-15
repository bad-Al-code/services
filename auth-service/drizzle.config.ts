import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    password: process.env.MYSQL_PASSWORD!,
    user: process.env.MYSQL_USER!,
    database: process.env.MYSQL_DATABASE!,
    host: process.env.MYSQL_HOST!,
    port: Number(process.env.MYSQL_PORT!) || 3306,
  },
});
