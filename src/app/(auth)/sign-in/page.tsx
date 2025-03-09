import { SignInForm } from '@/app/(auth)/sign-in/_form';

export default async function Page() {
  return (
    <>
      <h1 className="pb-4 text-5xl font-bold tracking-wide text-blue-500 uppercase">
        <span aria-hidden="true">&gt;</span> Sign_in
      </h1>
      <SignInForm />
    </>
  );
}
