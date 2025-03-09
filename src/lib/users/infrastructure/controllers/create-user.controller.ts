import type { CreateUserInput } from '@/lib/users/entities/inputs/users.inputs';

import { usersRepositoryImpl } from '@/lib/users/infrastructure/repositories/users.repository';
import { createUserUseCase } from '@/lib/users/application/use-cases/create-user.use-case';
import { createUserInput } from '@/lib/users/entities/inputs/users.inputs';
import { ValidationError } from '@/lib/shared/errors/validation.error';

export async function createUserController(user: CreateUserInput) {
  const validationResult = createUserInput.safeParse(user);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error.flatten().fieldErrors);
  }

  const { identityId, username } = validationResult.data;
  return createUserUseCase(usersRepositoryImpl)(username, identityId);
}
