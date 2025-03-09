import type { Id } from '@/lib/shared';

export type UsersRepository = {
  createUser(username: string, identityId: Id): Promise<Id>;
};
