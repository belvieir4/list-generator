import { HTMLProps } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';

type InputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const Input = ({ label, name, required, ...props }: InputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <label className="flex flex-col">
      {label && (
        <span className="mb-1 text-sm text-gray-600">
          {label}
          {required ? ' *' : ''}
        </span>
      )}
      <input
        {...props}
        {...field}
        className={classNames(
          'w-full appearance-none border-b border-blue-600 bg-slate-100 px-4 py-3 outline-none',
          props.className,
        )}
      />
    </label>
  );
};
