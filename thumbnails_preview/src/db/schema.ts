import { sql } from 'drizzle-orm';
import {
    mysqlTable,
    varchar,
    mysqlEnum,
    timestamp,
    int,
} from 'drizzle-orm/mysql-core';

export const videos = mysqlTable('videos', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    filename: varchar('filename', { length: 255 }).notNull(),
    s3Url: varchar('s3_url', { length: 2048 }).notNull(),
    status: mysqlEnum('status', [
        'pending',
        'processing',
        'completed',
        'failed',
        'deleted',
    ]).default('pending'),
    progress: int('progress').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    deletedAt: timestamp('deleted_at')
        .default(sql`null`)
        .$type<Date | null>(),
});
