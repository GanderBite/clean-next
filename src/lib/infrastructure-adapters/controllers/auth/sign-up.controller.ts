import { sessionsRepository } from '@/lib/infrastructure/repositories/sessions.repository';
import { usersRepository } from '@/lib/infrastructure/repositories/users.repository';
import { signUpUseCase } from '@/lib/application/use-cases/auth/sign-up.use-case';
import { authService } from '@/lib/infrastructure/services/auth.service';
import { InvalidInputError } from '@/lib/entities/errors/common.errors';
import { createUserModel } from '@/lib/entities/models/user.models';

export function signUpController(input: unknown) {
  const validationResult = createUserModel.safeParse(input);

  if (!validationResult.success) {
    throw new InvalidInputError(validationResult.error.flatten().fieldErrors);
  }

  return signUpUseCase(
    usersRepository,
    sessionsRepository,
    authService,
  )(validationResult.data);
}
