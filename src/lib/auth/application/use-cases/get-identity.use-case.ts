import type { IdentitiesRepository } from '@/lib/auth/application/repositories/identities.repository';
import type { SignInInput } from '@/lib/auth/entities/inputs/sign-in.input';

import { InvalidCredentialsError } from '@/lib/auth/entities/errors/identity.errors';

export function getIdentityUseCase(identitiesRepository: IdentitiesRepository) {
  return async ({ password, email }: SignInInput) => {
    const identity = await identitiesRepository.getIdentityByEmail(email);

    if (!identity || identity.password !== password) {
      throw new InvalidCredentialsError();
    }

    return identity;
  };
}
