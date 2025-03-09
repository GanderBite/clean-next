import type { UsersRepository } from '@/lib/users/application/repositories/users.repository';
import type { CreateUser } from '@/lib/users/entities/models/users.entities';
import type { Id } from '@/lib/shared';

import { usersTable } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';

export const usersRepositoryImpl: UsersRepository = (() => {
  const insertUser = async (user: CreateUser, identityId: Id) => {
    const [created] = await db
      .insert(usersTable)
      .values({ ...user, identityId })
      .returning({ id: usersTable.id });

    return created.id;
  };

  const getUserByIdentityId = async (identityId: Id) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.identityId, identityId));

    if (!user) return null;

    return user;
  };

  const getUserByUserName = async (username: string) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (!user) return null;

    return user;
  };

  return {
    getUserByIdentityId,
    getUserByUserName,
    insertUser,
  };
})();
