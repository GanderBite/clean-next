import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { sessionsTable } from '@/lib/db/schema/sessions';
import { usersTable } from '@/lib/db/schema/users';
import { relations } from 'drizzle-orm';

export const identitiesTable = pgTable('identities', {
  email: varchar('email', { length: 255 }).notNull().unique(),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  password: varchar('password').notNull(),
});

export const identitiesRelations = relations(
  identitiesTable,
  ({ many, one }) => ({
    sessions: many(sessionsTable),
    user: one(usersTable),
  }),
);
