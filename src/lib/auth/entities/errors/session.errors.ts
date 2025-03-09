import { ApiError } from '@/lib/shared';

export class SessionExpiredError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(401, 'Unauthorized', options);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(options?: ErrorOptions) {
    super(401, 'Unauthorized', options);
  }
}
