import type { UsersRepository } from '@/lib/users/application/repositories/users.repository';
import type { Id } from '@/lib/shared';

import { UserNotFoundError } from '@/lib/users/entities/errors/users.errors';

export function getUserByIdentityUseCase(repository: UsersRepository) {
  return async (id: Id) => {
    const user = await repository.getUserByIdentityId(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  };
}
