import 'dotenv/config';

import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    tablesFilter: ['videos'],
} satisfies Config;
