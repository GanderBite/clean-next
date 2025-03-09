'use server';

import type { Id } from '@/lib/shared';

import { cache } from 'react';
import { api } from '@/lib';

export const getUserByIdentityId = cache(async (identityId: Id) => {
  return api.users.getUserByIdentityId(identityId);
});
