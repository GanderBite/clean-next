import type { SessionsRepository } from '@/lib/auth/application/repositories/sessions.repository';
import type { Id } from '@/lib/shared';

import { UnauthorizedError } from '@/lib/auth/entities/errors/session.errors';
import { SECRET } from '@/lib/shared/constants/secret';
import { jwtVerify } from 'jose';

export function verifySessionUseCase(repository: SessionsRepository) {
  return async (token: string) => {
    const session = await repository.getSessionByToken(token);

    if (!session) {
      throw new UnauthorizedError();
    }

    if (session.expiresAt.getTime() - Date.now() <= 0) {
      await repository.deleteSession(session.id);
      throw new UnauthorizedError();
    }

    const { payload } = await jwtVerify<{ identityId: Id; userId: Id }>(
      session.token,
      SECRET,
    );

    return payload;
  };
}
