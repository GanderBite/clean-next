import { timestamp, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.schema';

export const sessions = pgTable('sessions', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar().notNull().unique(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  author: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
