import type { UsersRepository } from '@/lib/users/application/repositories/users.repository';
import type { Id } from '@/lib/shared';

import { UserAlreadyExistsError } from '@/lib/users/entities/errors/users.errors';
import { ApiError } from '@/lib/shared';

export function createUserUseCase(usersRepository: UsersRepository) {
  return async (username: string, identityId: Id) => {
    const existing = await usersRepository.getUserByUserName(username);

    if (existing) {
      throw new UserAlreadyExistsError();
    }

    try {
      const userId = await usersRepository.insertUser({ username }, identityId);

      return userId;
    } catch (err) {
      console.log(err);
      throw new ApiError(500, 'Creating user failed');
    }
  };
}
