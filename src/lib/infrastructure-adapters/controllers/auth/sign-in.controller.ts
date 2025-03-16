import { sessionsRepository } from '@/lib/infrastructure/repositories/sessions.repository';
import { usersRepository } from '@/lib/infrastructure/repositories/users.repository';
import { signInUseCase } from '@/lib/application/use-cases/auth/sign-in.use-case';
import { authService } from '@/lib/infrastructure/services/auth.service';
import { InvalidInputError } from '@/lib/entities/errors/common.errors';
import { userModel } from '@/lib/entities/models/user.models';

const schema = userModel.pick({ password: true, email: true });

export function signInController(input: unknown) {
  const validationResult = schema.safeParse(input);

  if (!validationResult.success) {
    throw new InvalidInputError(validationResult.error.flatten().fieldErrors);
  }

  return signInUseCase(
    usersRepository,
    sessionsRepository,
    authService,
  )(validationResult.data);
}
