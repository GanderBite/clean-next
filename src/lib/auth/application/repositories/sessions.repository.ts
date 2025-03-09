import type {
  CreateSession,
  Session,
} from '@/lib/auth/entities/models/session.entity';
import type { Id } from '@/lib/shared';

export type SessionsRepository = {
  getSessionByIdentityId(identity: Id): Promise<Session | null>;
  getSessionByToken(token: string): Promise<Session | null>;
  insertSession(session: CreateSession): Promise<string>;
  getSessionById(id: Id): Promise<Session | null>;
  deleteSession(id: Id): Promise<void>;
};
