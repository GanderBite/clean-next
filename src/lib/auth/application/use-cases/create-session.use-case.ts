import type { SessionsRepository } from '@/lib/auth/application/repositories/sessions.repository';
import type { CreateSessionInput } from '@/lib/auth/entities/inputs/session.inputs';

import { SESSION_TIME } from '@/lib/shared/constants/session-time';
import { SECRET } from '@/lib/shared/constants/secret';
import { ApiError } from '@/lib/shared';
import { SignJWT } from 'jose';

export function createSessionUseCase(repository: SessionsRepository) {
  return async ({ identityId }: CreateSessionInput) => {
    const existing = await repository.getSessionByIdentityId(identityId);

    if (existing) {
      return { expiresAt: existing.expiresAt, token: existing.token };
    }

    const expiresAt = new Date(Date.now() + SESSION_TIME);

    const token = await new SignJWT({
      identityId,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(SECRET);

    try {
      const createdToken = await repository.insertSession({
        identityId,
        expiresAt,
        token,
      });

      return { token: createdToken, expiresAt };
    } catch (err) {
      console.log(err);
      throw new ApiError(500, 'Creating session failed');
    }
  };
}
