import type {
  CreateSession,
  Session,
} from '@/lib/entities/models/session.models';
import type { Id } from '@/lib/entities/models/common.models';

export type SessionsRepositoryType = {
  getByToken: (token: string) => Promise<undefined | Session>;
  create: (data: CreateSession) => Promise<Id>;
};
