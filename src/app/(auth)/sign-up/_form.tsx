'use client';

import { FormControl } from '@/app/_components/form-control';
import { signUp } from '@/app/(auth)/sign-up/_action';
import { Input } from '@/app/_components/input';
import { useActionState } from 'react';
import Link from 'next/link';

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, {
    form: {
      confirmPassword: '',
      username: '',
      password: '',
      email: '',
    },
    status: 'idle',
  });

  const isError = state.status === 'error';

  return (
    <>
      {isError && (
        <pre className="pt-0.5 pb-2 text-center text-xs text-red-500">
          {state.error}
        </pre>
      )}
      <form className="flex flex-col gap-y-3" action={action}>
        <FormControl
          readOnly={pending}
          label="Username"
          name="username"
          state={state}
        >
          {(control) => <Input {...control} />}
        </FormControl>
        <FormControl
          readOnly={pending}
          label="Email"
          state={state}
          type="email"
          name="email"
        >
          {(control) => <Input {...control} />}
        </FormControl>
        <FormControl
          readOnly={pending}
          label="Password"
          type="password"
          name="password"
          state={state}
        >
          {(control) => <Input {...control} />}
        </FormControl>
        <FormControl
          label="Confirm Password"
          name="confirmPassword"
          readOnly={pending}
          type="password"
          state={state}
        >
          {(control) => <Input {...control} />}
        </FormControl>
        <button
          className="mt-4 cursor-pointer rounded-sm bg-blue-500 py-2 text-xl text-blue-100 uppercase shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-colors hover:bg-blue-600"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Creating account' : 'Sign_up'}
        </button>
      </form>
      <p className="pt-4 text-center text-sm">
        Have an account already?{' '}
        <Link className="underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </>
  );
}
