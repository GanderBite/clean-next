import { ApiError } from '@/lib/shared';

export class IdentityAlreadyExistsError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(409, `Identity already exists.`, options);
  }
}

export class InvalidCredentialsError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(400, `Invalid email or password`, options);
  }
}
