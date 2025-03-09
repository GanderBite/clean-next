import type {
  CreateUser,
  User,
} from '@/lib/users/entities/models/users.entities';
import type { Id } from '@/lib/shared';

export type UsersRepository = {
  insertUser(user: CreateUser, identityId: Id): Promise<Id>;
  getUserByUserName(username: string): Promise<User | null>;
  getUserByIdentityId(identityId: Id): Promise<User | null>;
};
