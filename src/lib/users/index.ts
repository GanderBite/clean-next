import { getUserByIdentityIdController } from '@/lib/users/infrastructure/controllers/get-user-by-identity-id.controller';
import { createUserController } from '@/lib/users/infrastructure/controllers/create-user.controller';

export const users = {
  getUserByIdentityId: getUserByIdentityIdController,
  createUser: createUserController,
};
