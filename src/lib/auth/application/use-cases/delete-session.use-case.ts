import type { SessionsRepository } from '@/lib/auth/application/repositories/sessions.repository';

import { UnauthorizedError } from '@/lib/auth/entities/errors/session.errors';

export function deleteSessionUseCase(repository: SessionsRepository) {
  return async (token: undefined | string) => {
    if (!token) {
      throw new UnauthorizedError();
    }

    const session = await repository.getSessionByToken(token);

    if (!session) {
      throw new UnauthorizedError();
    }

    await repository.deleteSession(session.id);
  };
}
