import { cn } from '../_utils/cn';

type Props = {
  error?: string[] | string | false;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, ...rest }: Props) {
  return (
    <label className="flex flex-col gap-y-1">
      {label && (
        <span className={cn({ 'text-error-500': !!error })}>{label}</span>
      )}
      <input
        className={cn('rounded-xs border-2 px-2 py-1.5 outline-blue-600', {
          'border-red-500': !!error,
        })}
        {...rest}
      />
      {error && Array.isArray(error) && (
        <ul className="pl-px">
          {error.map((message) => (
            <li key={message}>
              <pre className="py-0.5 text-xs text-red-500">{message}</pre>
            </li>
          ))}
        </ul>
      )}
      {error && typeof error === 'string' && (
        <pre className="py-0.5 text-xs text-red-500">{error}</pre>
      )}
    </label>
  );
}
