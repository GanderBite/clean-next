import { sessionsRepositoryImpl } from '@/lib/auth/infrastructure/repositories/sessions.repository';
import { deleteSessionUseCase } from '@/lib/auth/application/use-cases/delete-session.use-case';
import { withSession } from '@/lib/shared';

export const signOutController = async (token: undefined | string) => {
  await withSession();

  return deleteSessionUseCase(sessionsRepositoryImpl)(token);
};
