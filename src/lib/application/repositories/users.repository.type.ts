import type { CreateUser, User } from '@/lib/entities/models/user.models';
import type { Id } from '@/lib/entities/models/common.models';

export type UsersRepositoryType = {
  getByUsername: (username: string) => Promise<undefined | User>;
  getByEmail: (email: string) => Promise<undefined | User>;
  getById: (id: Id) => Promise<undefined | User>;
  create: (data: CreateUser) => Promise<Id>;
};
