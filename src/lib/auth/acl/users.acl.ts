import type { UsersRepository } from '@/lib/auth/application/repositories/users.repository';
import type { Id } from '@/lib/shared';

import { users } from '@/lib/users';

export const usersRepository: UsersRepository = (() => {
  const createUser = async (username: string, identityId: Id) => {
    return users.createUser({ identityId, username });
  };

  return {
    createUser,
  };
})();
