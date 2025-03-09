import type { IdentitiesRepository } from '@/lib/auth/application/repositories/identities.repository';
import type { CreateIdentity } from '@/lib/auth/entities/models/identity.entity';
import type { Id } from '@/lib/shared';

import { identitiesTable } from '@/lib/db/schema/identities';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';

export const identitiesRepositoryImpl: IdentitiesRepository = (() => {
  const insertIdentity = async (identity: CreateIdentity) => {
    const [created] = await db
      .insert(identitiesTable)
      .values(identity)
      .returning({ id: identitiesTable.id });

    return created.id;
  };

  const getIdentityById = async (id: Id) => {
    const [identity] = await db
      .select()
      .from(identitiesTable)
      .where(eq(identitiesTable.id, id));

    if (!identity) {
      return null;
    }

    return identity;
  };

  const getIdentityByEmail = async (email: string) => {
    const [identity] = await db
      .select()
      .from(identitiesTable)
      .where(eq(identitiesTable.email, email));

    if (!identity) {
      return null;
    }

    return identity;
  };

  return {
    getIdentityByEmail,
    getIdentityById,
    insertIdentity,
  };
})();
