import { HTMLProps, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';

type InputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const InputNumber = forwardRef(
  (
    { label, name, required, min, max, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const { control, setValue } = useFormContext();
    const { field } = useController({ name, control });
    return (
      <label className="flex flex-col">
        {label && (
          <span className="mb-1 text-sm text-gray-600">
            {label}
            {required ? ' *' : ''}
          </span>
        )}
        <div className="flex rounded border-b border-blue-600 bg-slate-100 px-4 py-2">
          <button
            className="h-8 w-8 text-xl text-blue-800"
            onClick={() => {
              if (min && field.value > min) setValue(name, field.value - 1);
            }}
          >
            -
          </button>
          <input
            {...props}
            value={field.value}
            readOnly
            ref={ref}
            type="number"
            className={classNames(
              'w-full flex-1 appearance-none bg-slate-100 text-center outline-none',
              props.className,
            )}
          />

          <button
            className="h-8 w-8 text-xl text-blue-800"
            onClick={() => {
              if (max && field.value < max) {
                setValue(name, field.value + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </label>
    );
  },
);
