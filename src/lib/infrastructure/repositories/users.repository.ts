import type { UsersRepositoryType } from '@/lib/application/repositories/users.repository.type';
import type { CreateUser } from '@/lib/entities/models/user.models';
import type { Id } from '@/lib/entities/models/common.models';

import { users } from '@/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';

export const usersRepository = ((): UsersRepositoryType => {
  const create = async (user: CreateUser) => {
    const [created] = await db
      .insert(users)
      .values(user)
      .returning({ id: users.id });

    return created.id;
  };

  const getByEmail = async (email: string) => {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  };

  const getByUsername = async (username: string) => {
    return db.query.users.findFirst({
      where: eq(users.username, username),
    });
  };

  const getById = async (id: Id) => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  };

  return {
    getByUsername,
    getByEmail,
    getById,
    create,
  };
})();
