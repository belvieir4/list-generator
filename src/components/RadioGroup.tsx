import { HTMLProps } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type Radio = {
  label: string;
  value: string;
};

type RadioGroupProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
  radios: Radio[];
};

export const RadioGroup = ({ label, name, radios }: RadioGroupProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <div className="flex flex-col">
      {label && <span className="mb-2 text-sm text-gray-600">{label}</span>}
      <div className="flex items-center gap-4">
        {radios.map((radio) => (
          <label className="flex items-center gap-2" key={radio.value}>
            <input
              {...field}
              value={radio.value}
              checked={field.value === radio.value}
              type="radio"
              className="h-5 w-5"
            />
            <span>{radio.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
