'use server';

import type { ActionState } from '@/app/_types/action-state.types';

import { signUpController } from '@/lib/infrastructure-adapters/controllers/auth/sign-up.controller';
import { parseErrorToActionError } from '@/app/_utils/parse-error-to-action-error';
import { RedirectType, redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type Form = {
  confirmPassword: string;
  username: string;
  password: string;
  email: string;
};

type State = ActionState<Form>;

export async function signUp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const form = Object.fromEntries(formData.entries()) as Form;

  try {
    const cookie = await signUpController(form);

    (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
  } catch (err) {
    return parseErrorToActionError(prevState, err);
  }

  redirect(`/dashboard`, RedirectType.replace);
}
