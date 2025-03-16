import { InvalidInputError } from '@/lib/entities/errors/common.errors';

import type { ActionState } from '../_types/action-state.types';

export function parseErrorToActionError<TForm, TData = undefined>(
  prevState: ActionState<TForm, TData>,
  err: unknown,
): ActionState<TForm, TData> {
  if (err instanceof InvalidInputError) {
    return {
      ...prevState,
      status: 'validation-error',
      errors: err.errors,
    };
  }
  if (err instanceof Error) {
    return {
      ...prevState,
      error: err.message,
      status: 'error',
    };
  }

  return {
    ...prevState,
    error: 'Unknown error',
    status: 'error',
  };
}
