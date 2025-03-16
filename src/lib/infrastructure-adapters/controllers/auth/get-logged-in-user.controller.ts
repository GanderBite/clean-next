import { getLoggedInUserUseCase } from '@/lib/application/use-cases/auth/get-logged-in-user.use-case';
import { usersRepository } from '@/lib/infrastructure/repositories/users.repository';
import { authService } from '@/lib/infrastructure/services/auth.service';

export function getLoggedInUserController() {
  return getLoggedInUserUseCase(usersRepository, authService);
}
