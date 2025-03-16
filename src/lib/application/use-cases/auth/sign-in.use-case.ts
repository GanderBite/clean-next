import type { User } from '@/lib/entities/models/user.models';

import { InvalidCredentialsError } from '@/lib/entities/errors/auth.errors';

import type { SessionsRepositoryType } from '../../repositories/sessions.repository.type';
import type { UsersRepositoryType } from '../../repositories/users.repository.type';
import type { AuthServiceType } from '../../services/auth.service.type';

export function signInUseCase(
  usersRepository: UsersRepositoryType,
  sessionsRepository: SessionsRepositoryType,
  authService: AuthServiceType,
) {
  return async (user: Pick<User, 'password' | 'email'>) => {
    const existingUser = await usersRepository.getByEmail(user.email);

    if (!existingUser) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await authService.validatePassword(
      user.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const { expiresAt, token } = await authService.createToken(existingUser.id);

    await sessionsRepository.create({
      userId: existingUser.id,
      expiresAt,
      token,
    });

    const cookie = authService.createSessionCookie(token, {
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
    });

    return cookie;
  };
}
