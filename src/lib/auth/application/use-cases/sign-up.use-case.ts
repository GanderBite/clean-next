import type { IdentitiesRepository } from '@/lib/auth/application/repositories/identities.repository';
import type { UsersRepository } from '@/lib/auth/application/repositories/users.repository';
import type { SignUpInput } from '@/lib/auth/entities/inputs/sign-up.input';

export function signUpUseCase(
  identitiesRepository: IdentitiesRepository,
  usersRepository: UsersRepository,
) {
  return async ({ username, password, email }: SignUpInput) => {
    const identityId = await identitiesRepository.insertIdentity({
      password,
      email,
    });
    await usersRepository.createUser(username, identityId);

    return identityId;
  };
}
