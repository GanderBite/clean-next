import { ApiError } from '@/lib/shared';

export class UserAlreadyExistsError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(409, 'User already exists', options);
  }
}

export class UserNotFoundError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(404, 'User not found', options);
  }
}
