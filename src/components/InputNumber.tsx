import { HTMLProps } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';

type InputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const InputNumber = ({ label, name, ...props }: InputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <label className="flex flex-col">
      {label && <span className="mb-2 text-xl">{label}</span>}
      <div className="flex h-8 border-b border-blue-600">
        <button className="h-8 w-8">-</button>
        <input
          {...props}
          {...field}
          type="number"
          className={classNames(
            'w-full flex-1 appearance-none text-center outline-none',
            props.className,
          )}
        />

        <button className="h-8 w-8">+</button>
      </div>
    </label>
  );
};
