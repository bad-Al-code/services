import mysql, { Pool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/singlestore/driver';

import { envVariables } from '../config/env';

export class Database {
    private pool: Pool;
    public db: ReturnType<typeof drizzle>;

    constructor() {
        this.pool = mysql.createPool(envVariables.DATABASE_URL);
        this.db = drizzle(this.pool);
    }

    async start(): Promise<void> {
        try {
            await this.pool.getConnection();
            console.log('Database Connection Established.');
        } catch (error) {
            console.error('Error establishing database connection: ', error);
            throw error;
        }
    }

    async end(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Database Connection CLOSEd');
        } catch (error) {
            console.error('ERROR ELOSING database connection: ', error);
        }
    }
}

const database = new Database();
export const db = database.db;
export const dbInstance = database;
