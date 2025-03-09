import { SignUpForm } from '@/app/(auth)/sign-up/_form';

export default function SignUpPage() {
  return (
    <>
      <h1 className="pb-4 text-5xl font-bold tracking-wide text-blue-500 uppercase">
        <span aria-hidden="true">&gt;</span> Create_account
      </h1>
      <SignUpForm />
    </>
  );
}
