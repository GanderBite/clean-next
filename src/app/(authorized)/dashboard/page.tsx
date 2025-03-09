import { signOut } from '@/app/(authorized)/dashboard/_actions';
import { session } from '@/app/_hooks/use-session';

export default async function Page() {
  const { user } = await session();

  return (
    <main className="relative min-h-screen bg-blue-500 p-8">
      <h1 className="pb-4 text-3xl text-white">Hello @{user.username}!</h1>
      <h2 className="pb-10 text-xl text-white">This is your space.</h2>
      <form action={signOut}>
        <button
          className="absolute right-8 bottom-8 min-w-48 cursor-pointer rounded-sm bg-red-500 py-1 text-xl text-red-950 uppercase shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-colors hover:bg-red-300"
          type="submit"
        >
          Leave
        </button>
      </form>
    </main>
  );
}
