import { HTMLProps, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';

type InputFileProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  buttonText: string;
  name: string;
  accept: string;
};

export const InputFile = ({
  label,
  buttonText,
  name,
  required,
  ...props
}: InputFileProps) => {
  const { control, setValue } = useFormContext();
  const { field } = useController({ name, control });
  const [isOpen, setIsOpen] = useState(false);
  const smallList = Array.from(field.value as FileList).slice(0, 5);
  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (field.value?.length === 0 && inputFile.current) {
      inputFile.current.value = '';
    }
  }, [field.value]);

  return (
    <label className="flex flex-col">
      {label && (
        <span className="mb-2 text-sm text-gray-600">
          {label}
          {required ? ' *' : ''}
        </span>
      )}
      <button className="relative rounded-lg border border-blue-600 bg-blue-100 px-6 py-3 text-blue-900">
        {buttonText}
        <input
          {...props}
          ref={inputFile}
          name={field.name}
          onChange={(ev) => {
            const acceptFiles = props.accept.split(',');
            setValue(
              name,
              Array.from(ev.target.files || []).filter((file) =>
                acceptFiles.includes(file.type),
              ),
            );
          }}
          className={classNames(
            'absolute left-0 top-0 h-full w-full appearance-none border-b border-blue-600 opacity-0 outline-none',
            props.className,
          )}
          type="file"
        />
      </button>
      <div className="flex flex-col items-start">
        {(smallList.length === 5 && !isOpen
          ? smallList
          : Array.from(field.value as File[])
        ).map((file, index) => (
          <div
            key={file.name}
            className="grid grid-cols-[1fr_auto] items-center text-sm text-gray-800"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {file.name}
            </span>
            <button
              onClick={() =>
                setValue(
                  name,
                  Array.from(field.value as File[]).filter(
                    (_, i) => index !== i,
                  ),
                )
              }
            >
              <div className="px-2 text-xl text-blue-700">x</div>
            </button>
          </div>
        ))}
        {smallList.length === 5 && (
          <button
            className="mt-2 text-blue-700"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
    </label>
  );
};
