export type ActionSuccess<TData = undefined> = TData extends undefined
  ? { status: Extract<ActionStatus, 'success'>; data: undefined }
  : { status: Extract<ActionStatus, 'success'>; data: TData };

export type ActionState<TForm, TData = undefined> = (
  | ActionValidationError<TForm>
  | ActionSuccess<TData>
  | ActionError
  | ActionIdle
) & { form: TForm };

export type ActionValidationError<TForm> = {
  status: Extract<ActionStatus, 'validation-error'>;
  errors: { [key in keyof TForm]?: string[] };
};

export type ActionError = {
  status: Extract<ActionStatus, 'error'>;
  error: string;
};

export type ActionStatus = 'validation-error' | 'success' | 'error' | 'idle';

type ActionIdle = { status: Extract<ActionStatus, 'idle'> };
