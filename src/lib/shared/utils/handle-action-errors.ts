import type { ActionState } from '@/lib/shared';

import { ValidationError, ApiError } from '@/lib/shared';

export function handleActionErrors<TForm extends object>(
  err: unknown,
  form: TForm,
): ActionState<TForm> {
  if (err instanceof ValidationError) {
    return {
      status: 'validation-error',
      errors: err.errors,
      form,
    };
  } else if (err instanceof ApiError) {
    return {
      status: 'api-error',
      error: err.message,
      code: err.code,
      form,
    };
  }

  return {
    error: 'Unknown error occurred',
    status: 'error',
    form,
  };
}
