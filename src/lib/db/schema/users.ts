import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { identitiesTable } from '@/lib/db/schema/identities';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  identityId: integer('identity_id')
    .notNull()
    .unique()
    .references(() => identitiesTable.id, {
      onDelete: 'cascade',
    }),
  username: varchar('username', { length: 50 }).notNull().unique(),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
});

export const usersInfoRelations = relations(usersTable, ({ one }) => ({
  identity: one(identitiesTable, {
    references: [identitiesTable.id],
    fields: [usersTable.identityId],
  }),
}));
