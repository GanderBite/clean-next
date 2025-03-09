import { identitiesRepositoryImpl } from '@/lib/auth/infrastructure/repositories/identities.repository';
import { sessionsRepositoryImpl } from '@/lib/auth/infrastructure/repositories/sessions.repository';
import { createSessionUseCase } from '@/lib/auth/application/use-cases/create-session.use-case';
import {
  type SignInInput,
  signInInput,
} from '@/lib/auth/entities/inputs/sign-in.input';
import { getIdentityUseCase } from '@/lib/auth/application/use-cases/get-identity.use-case';
import { ValidationError } from '@/lib/shared/errors/validation.error';

export const signInController = async (input: SignInInput) => {
  const validationResult = signInInput.safeParse(input);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error.flatten().fieldErrors);
  }

  const identity = await getIdentityUseCase(identitiesRepositoryImpl)(
    validationResult.data,
  );

  const session = await createSessionUseCase(sessionsRepositoryImpl)({
    identityId: identity.id,
  });

  return session;
};
