import type {
  CookieAttributes,
  Cookie,
} from '@/lib/entities/models/cookie.models';
import type { Id } from '@/lib/entities/models/common.models';

export type AuthServiceType = {
  createSessionCookie(
    token: string,
    attributes?: Partial<CookieAttributes>,
  ): Cookie;
  validatePassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  createToken(userId: Id): Promise<{ expiresAt: Date; token: string }>;
  getPayload: (token: string) => Promise<{ userId: Id }>;
  hashPassword(password: string): Promise<string>;
};
