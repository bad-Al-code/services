import { sql } from 'drizzle-orm';
import { mysqlTable, varchar, text, mysqlEnum, timestamp } from 'drizzle-orm/mysql-core';

export const userRoles = ['admin', 'user'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = mysqlEnum('user_roles', userRoles);

export const UserTable = mysqlTable('users', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  test: varchar('test', { length: 32 }),
  password: text(),
  salt: text(),
  role: userRoleEnum.notNull().default('user'),

  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
