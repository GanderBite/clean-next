import type {
  CookieAttributes,
  Cookie,
} from '@/lib/entities/models/cookie.models';
import type { AuthServiceType } from '@/lib/application/services/auth.service.type';
import type { Id } from '@/lib/entities/models/common.models';

import * as jose from 'jose';
import crypto from 'crypto';
import dayjs from 'dayjs';

export const authService = ((): AuthServiceType => {
  const HASH_ALGORITHM = 'sha256';
  const SALT_LENGTH = 16;
  const ITERATIONS = 100000;
  const KEY_LENGTH = 64;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const alg = 'HS256';

  const createToken = async (userId: Id) => {
    const expiresAt = dayjs().add(24, 'hours').toDate();

    const token = await new jose.SignJWT({ userId })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(secret);

    return {
      expiresAt,
      token,
    };
  };

  const createSessionCookie = (
    token: string,
    attributes: Partial<CookieAttributes>,
  ): Cookie => {
    return {
      name: 'session',
      value: token,
      attributes,
    };
  };

  const hashPassword = async (password: string) => {
    return new Promise<string>((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt

      crypto.pbkdf2(
        password,
        salt,
        ITERATIONS,
        KEY_LENGTH,
        HASH_ALGORITHM,
        (err, derivedKey) => {
          if (err) reject(err);
          resolve(`${salt}:${derivedKey.toString('hex')}`);
        },
      );
    });
  };

  const getPayload = async (token: string) => {
    const { payload } = await jose.jwtVerify(token, secret);

    return payload as { userId: Id };
  };

  const validatePassword = async (input: string, password: string) => {
    const [salt, hashedPassword] = password.split(':');

    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        input,
        salt,
        ITERATIONS,
        KEY_LENGTH,
        HASH_ALGORITHM,
        (err, derivedKey) => {
          if (err) return reject(err);
          resolve(derivedKey.toString('hex') === hashedPassword);
        },
      );
    });
  };

  return {
    createSessionCookie,
    validatePassword,
    hashPassword,
    createToken,
    getPayload,
  };
})();
