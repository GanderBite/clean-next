import type { PropsWithChildren } from 'react';

import { authorizedRoute } from '@/app/_hooks/use-authorized-route';

export default async function Layout({ children }: PropsWithChildren) {
  await authorizedRoute();

  return children;
}
