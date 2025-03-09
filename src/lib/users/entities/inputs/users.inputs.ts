import { createUserSchema } from '@/lib/users/entities/models/users.entities';
import { z } from 'zod';

export const createUserInput = createUserSchema
  .pick({
    username: true,
  })
  .and(
    z.object({
      identityId: z.number(),
    }),
  );

export type CreateUserInput = z.input<typeof createUserInput>;
