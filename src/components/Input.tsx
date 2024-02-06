import { HTMLProps } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';

type InputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const Input = ({ label, name, ...props }: InputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <label className="flex flex-col">
      {label && <span className="mb-2 text-xl">{label}</span>}
      <input
        {...props}
        {...field}
        className={classNames(
          'w-full appearance-none border-b border-blue-600 outline-none',
          props.className,
        )}
      />
    </label>
  );
};
