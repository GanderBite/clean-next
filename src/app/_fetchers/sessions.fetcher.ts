'use server';

import { cookies } from 'next/headers';
import { api } from '@/lib';

export const getSession = async () => {
  const token = (await cookies()).get('session')?.value;

  return api.auth.sessions.verifySession(token);
};
