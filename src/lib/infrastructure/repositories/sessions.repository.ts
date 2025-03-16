import type { SessionsRepositoryType } from '@/lib/application/repositories/sessions.repository.type';
import type { CreateSession } from '@/lib/entities/models/session.models';

import { sessions } from '@/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';

export const sessionsRepository = ((): SessionsRepositoryType => {
  const create = async (session: CreateSession) => {
    const [created] = await db.insert(sessions).values(session).returning({
      id: sessions.id,
    });

    return created.id;
  };

  const getByToken = async (token: string) => {
    return db.query.sessions.findFirst({
      where: eq(sessions.token, token),
    });
  };

  return {
    getByToken,
    create,
  };
})();
