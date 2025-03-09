import type { ActionState } from '@/lib/shared';

type Props<T extends ActionState<Record<string, unknown>>> = {
  children: (
    data: {
      error: undefined | string[] | string | false;
      label: string;
    } & InputProps,
  ) => React.ReactNode;
  label: string;
  name: string;
  state: T;
} & InputProps;

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'>;

export function FormControl<T extends ActionState<Record<string, unknown>>>({
  children,
  state,
  label,
  name,
  ...rest
}: Props<T>) {
  const isInvalid = state.status === 'validation-error';

  const error = isInvalid && state.errors[name];

  return children({
    defaultValue: state.form[name] as string,
    error,
    label,
    name,
    ...rest,
  });
}
