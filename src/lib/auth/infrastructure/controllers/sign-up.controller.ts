import type { SignUpInput } from '@/lib/auth/entities/inputs/sign-up.input';

import { identitiesRepositoryImpl } from '@/lib/auth/infrastructure/repositories/identities.repository';
import { sessionsRepositoryImpl } from '@/lib/auth/infrastructure/repositories/sessions.repository';
import { createSessionUseCase } from '@/lib/auth/application/use-cases/create-session.use-case';
import { signUpUseCase } from '@/lib/auth/application/use-cases/sign-up.use-case';
import { signUpInput } from '@/lib/auth/entities/inputs/sign-up.input';
import { ValidationError } from '@/lib/shared/errors/validation.error';
import { usersRepository } from '@/lib/auth/acl/users.acl';

export const signUpController = async (input: SignUpInput) => {
  const validationResult = signUpInput.safeParse(input);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error.flatten().fieldErrors);
  }

  const identityId = await signUpUseCase(
    identitiesRepositoryImpl,
    usersRepository,
  )(validationResult.data);
  const session = await createSessionUseCase(sessionsRepositoryImpl)({
    identityId,
  });

  return session;
};
