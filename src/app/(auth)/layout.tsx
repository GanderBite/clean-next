import type { PropsWithChildren } from 'react';

import { unauthorizedRoute } from '@/app/_hooks/use-unauthorized-route';

export default async function Layout({ children }: PropsWithChildren) {
  await unauthorizedRoute();

  return (
    <div className="flex min-h-screen max-w-screen items-center justify-center bg-blue-500 p-10">
      <main className="min-w-lg rounded-sm bg-blue-100 p-8 text-blue-950 shadow-[10px_10px_0_0_rgba(0,0,0,1)] ring-2 ring-black">
        {children}
      </main>
    </div>
  );
}
