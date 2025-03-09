import type { Id } from '@/lib/shared';

import { getUserByIdentityUseCase } from '@/lib/users/application/use-cases/get-user-by-identity';
import { usersRepositoryImpl } from '@/lib/users/infrastructure/repositories/users.repository';
import { withSession } from '@/lib/shared';

export async function getUserByIdentityIdController(identityId: Id) {
  await withSession();

  return getUserByIdentityUseCase(usersRepositoryImpl)(identityId);
}
