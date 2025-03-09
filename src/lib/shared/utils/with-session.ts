'use server';

import { authAcl } from '@/lib/shared/acl/auth.acl';
import { cookies } from 'next/headers';

export async function withSession() {
  await authAcl.verifySession((await cookies()).get('session')?.value);
}
