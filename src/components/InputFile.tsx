import { HTMLProps } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import { FormValues } from 'App';

type InputFileProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  buttonText: string;
  name: string;
};

export const InputFile = ({
  label,
  buttonText,
  name,
  ...props
}: InputFileProps) => {
  const { control, setValue } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <label className="flex flex-col">
      {label && <span className="mb-2 text-xl">{label}</span>}
      <button className="relative rounded-3xl border border-blue-500 bg-blue-200 px-10 py-3">
        {buttonText}
        <input
          {...props}
          name={field.name}
          onChange={(ev) => {
            setValue(name, ev.target.files);
          }}
          className={classNames(
            'absolute left-0 top-0 h-full w-full appearance-none border-b border-blue-600 opacity-0 outline-none',
            props.className,
          )}
          type="file"
        />
      </button>
      <div className="flex flex-col">
        {Array.from(field.value as File[]).map((file, index) => (
          <div key={file.name}>
            {file.name}
            <button
              onClick={() =>
                setValue(
                  name,
                  Array.from(field.value as File[]).filter(
                    (item) => item.name !== file.name,
                  ),
                )
              }
            >
              x
            </button>
          </div>
        ))}
      </div>
    </label>
  );
};
