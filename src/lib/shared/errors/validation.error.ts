import { ApiError } from '@/lib/shared/errors/api.error';

export class ValidationError<T extends object> extends ApiError {
  public errors: { [key in keyof T]?: string[] | string };

  constructor(
    errors: { [key in keyof T]?: string[] | string },
    options?: ErrorOptions,
  ) {
    super(400, 'Invalid input received', options);
    this.errors = errors;
  }
}
