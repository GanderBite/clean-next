import type {
  CreateIdentity,
  Identity,
} from '@/lib/auth/entities/models/identity.entity';
import type { Id } from '@/lib/shared';

export type IdentitiesRepository = {
  getIdentityByEmail(email: string): Promise<Identity | null>;
  insertIdentity(identity: CreateIdentity): Promise<Id>;
  getIdentityById(id: Id): Promise<Identity | null>;
};
