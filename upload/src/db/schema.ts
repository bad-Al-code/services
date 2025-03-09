import {
    mysqlTable,
    serial,
    varchar,
    mysqlEnum,
    timestamp,
} from 'drizzle-orm/mysql-core';

export const videos = mysqlTable('videos', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    filename: varchar('filename', { length: 255 }).notNull(),
    s3Url: varchar('s3_url', { length: 2048 }).notNull(),
    status: mysqlEnum('status', [
        'pending',
        'processing',
        'completed',
        'failed',
    ]).default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
});
