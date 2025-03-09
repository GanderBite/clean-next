import type { SessionsRepository } from '@/lib/auth/application/repositories/sessions.repository';
import type { CreateSession } from '@/lib/auth/entities/models/session.entity';
import type { Id } from '@/lib/shared';

import { sessionsTable } from '@/lib/db/schema/sessions';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';

export const sessionsRepositoryImpl: SessionsRepository = (() => {
  const insertSession = async (session: CreateSession) => {
    const [created] = await db
      .insert(sessionsTable)
      .values(session)
      .returning({ token: sessionsTable.token });

    return created.token;
  };

  const getSessionByIdentityId = async (identityId: Id) => {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.identityId, identityId));

    if (!session) return null;

    return session;
  };

  const getSessionByToken = async (token: string) => {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.token, token));

    if (!session) return null;

    return session;
  };

  const getSessionById = async (id: Id) => {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));

    if (!session) return null;

    return session;
  };

  const deleteSession = async (id: Id) => {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, id));
  };

  return {
    getSessionByIdentityId,
    getSessionByToken,
    getSessionById,
    insertSession,
    deleteSession,
  };
})();
