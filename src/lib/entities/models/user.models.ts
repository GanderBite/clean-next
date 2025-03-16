import { z } from 'zod';

import { idModel } from './common.models';

export const userModel = z.object({
  email: z.string().email().min(1).max(255),
  username: z.string().min(1).max(50),
  password: z.string().min(6),
  id: idModel,
});

export type User = z.infer<typeof userModel>;

export const createUserModel = userModel.pick({
  username: true,
  password: true,
  email: true,
});

export type CreateUser = z.infer<typeof createUserModel>;
