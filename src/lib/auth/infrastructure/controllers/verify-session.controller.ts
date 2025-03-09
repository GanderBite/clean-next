import { sessionsRepositoryImpl } from '@/lib/auth/infrastructure/repositories/sessions.repository';
import { verifySessionUseCase } from '@/lib/auth/application/use-cases/verify-session.use-case';
import { UnauthorizedError } from '@/lib/auth/entities/errors/session.errors';

export const verifySessionController = (token: undefined | string) => {
  if (!token) {
    throw new UnauthorizedError();
  }

  return verifySessionUseCase(sessionsRepositoryImpl)(token);
};
