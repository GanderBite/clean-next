import { UserNotFoundError } from '@/lib/entities/errors/user.errors';

import type { UsersRepositoryType } from '../../repositories/users.repository.type';
import type { AuthServiceType } from '../../services/auth.service.type';

export function getLoggedInUserUseCase(
  usersRepository: UsersRepositoryType,
  authService: AuthServiceType,
) {
  return async (token: string) => {
    const payload = await authService.getPayload(token);

    const user = await usersRepository.getById(payload.userId);

    if (!user) {
      throw new UserNotFoundError(payload.userId);
    }

    return {
      username: user.username,
      email: user.email,
      id: user.id,
    };
  };
}
