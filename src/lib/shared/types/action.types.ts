export type ActionState<
  TForm extends object,
  TDefaultState = undefined,
  TData = undefined,
> = (
  | ActionValidationErrorState<TForm>
  | ActionSuccessState<TData>
  | ActionApiErrorState
  | ActionErrorState
  | ActionIdleState
) &
  (TDefaultState extends undefined
    ? {
        defaultState?: undefined;
      }
    : { defaultState: TDefaultState }) & { form: TForm };

export type ActionSuccessState<TData = undefined> = TData extends undefined
  ? {
      status: Extract<ActionResult, 'success'>;
    }
  : {
      status: Extract<ActionResult, 'success'>;
      data: TData;
    };

export type ActionValidationErrorState<TForm> = {
  errors: { [key in keyof TForm]?: string[] | string };
  status: Extract<ActionResult, 'validation-error'>;
};

export type ActionApiErrorState = {
  status: Extract<ActionResult, 'api-error'>;
  error: string;
  code: number;
};

export type ActionResult =
  | 'validation-error'
  | 'api-error'
  | 'success'
  | 'error'
  | 'idle';

export type ActionErrorState = {
  status: Extract<ActionResult, 'error'>;
  error: string;
};

export type ActionIdleState = {
  status: Extract<ActionResult, 'idle'>;
};
