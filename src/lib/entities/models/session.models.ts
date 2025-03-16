import { z } from 'zod';

import { idModel } from './common.models';

export const sessionModel = z.object({
  createdAt: z.date(),
  expiresAt: z.date(),
  token: z.string(),
  userId: idModel,
  id: idModel,
});

export type Session = z.infer<typeof sessionModel>;

export const createSessionModel = sessionModel.omit({
  createdAt: true,
  id: true,
});

export type CreateSession = z.infer<typeof createSessionModel>;
