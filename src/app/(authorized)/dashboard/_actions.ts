'use server';

import { RedirectType, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { api } from '@/lib';

export async function signOut() {
  const cookiesData = await cookies();
  await api.auth.signOut(cookiesData.get('session')?.value);
  cookiesData.delete('session');

  redirect('/sign-in', RedirectType.replace);
}
