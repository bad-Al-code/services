import mysql, { Pool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

import { envVariables } from '../config/env';
import * as schema from './schema';

export class Database {
    private pool: Pool;
    public db: ReturnType<typeof drizzle>;

    constructor() {
        this.pool = mysql.createPool(envVariables.DATABASE_URL);
        this.db = drizzle(this.pool, { schema, mode: 'default' });
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

    async insertDummyData(): Promise<void> {
        try {
            await this.db.insert(schema.videos).values({
                userId: '1',
                filename: 'test_video_1.mp4',
                s3Url: 's3://upload_video_test_bucket_name/test_video_1.mp4',
                status: 'pending',
            });

            await this.db.insert(schema.videos).values({
                userId: '2',
                filename: 'test_video_2.mp4',
                s3Url: 's3://upload_video_test_bucket_name/test_video_2.mp4',
                status: 'processing',
            });

            console.log('Dummy data inserted successfully.');
        } catch (error) {
            console.error('Error inserting dummy data:', error);
        }
    }
}

const database = new Database();
export const db = database.db;
export const dbInstance = database;
