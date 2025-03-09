'use server';

import type { ActionState } from '@/lib/shared';

import { RedirectType, redirect } from 'next/navigation';
import { handleActionErrors } from '@/lib/shared';
import { cookies } from 'next/headers';
import { api } from '@/lib';

type Form = {
  confirmPassword: string;
  username: string;
  password: string;
  email: string;
};

type State = ActionState<Form>;

export async function signUp(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const form = Object.fromEntries(formData.entries()) as Form;

  try {
    const { expiresAt, token } = await api.auth.signUp(form);

    (await cookies()).set('session', token, {
      expires: expiresAt,
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
    });
  } catch (err) {
    return handleActionErrors(err, form);
  }

  redirect(`/dashboard`, RedirectType.replace);
}
