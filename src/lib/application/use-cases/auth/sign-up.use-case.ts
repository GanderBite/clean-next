import type { CreateUser } from '@/lib/entities/models/user.models';

import {
  UserUsernameTakenError,
  UserEmailTakenError,
} from '@/lib/entities/errors/user.errors';

import type { SessionsRepositoryType } from '../../repositories/sessions.repository.type';
import type { UsersRepositoryType } from '../../repositories/users.repository.type';
import type { AuthServiceType } from '../../services/auth.service.type';

export function signUpUseCase(
  usersRepository: UsersRepositoryType,
  sessionsRepository: SessionsRepositoryType,
  authService: AuthServiceType,
) {
  return async (user: CreateUser) => {
    let existingUser = await usersRepository.getByEmail(user.email);

    if (existingUser) {
      throw new UserEmailTakenError(user.email);
    }

    existingUser = await usersRepository.getByUsername(user.username);

    if (existingUser) {
      throw new UserUsernameTakenError(user.email);
    }

    const { password, ...restUser } = user;
    const hashedPassword = await authService.hashPassword(password);

    const userId = await usersRepository.create({
      ...restUser,
      password: hashedPassword,
    });

    const { expiresAt, token } = await authService.createToken(userId);

    await sessionsRepository.create({
      expiresAt,
      userId,
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
