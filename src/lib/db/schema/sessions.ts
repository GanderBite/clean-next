import { timestamp, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { identitiesTable } from '@/lib/db/schema/identities';
import { relations } from 'drizzle-orm';

export const sessionsTable = pgTable('sessions', {
  identityId: integer('identity_id')
    .notNull()
    .references(() => identitiesTable.id, {
      onDelete: 'cascade',
    }),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token').notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  identity: one(identitiesTable, {
    fields: [sessionsTable.identityId],
    references: [identitiesTable.id],
  }),
}));
