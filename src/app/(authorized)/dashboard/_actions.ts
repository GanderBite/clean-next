'use server';

import { RedirectType, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signOut() {
  const cookiesData = await cookies();
  cookiesData.delete('session');

  redirect('/sign-in', RedirectType.replace);
}
