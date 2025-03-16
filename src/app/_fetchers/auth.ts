import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { api } from '@/lib';

async function getLoggedInUser() {
  const c = await cookies();

  const token = c.get('session')?.value ?? '';

  return api.auth.getLoggedInUser(token);
}

export const auth = {
  getLoggedInUser: cache(getLoggedInUser),
};
