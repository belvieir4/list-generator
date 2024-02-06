import { ChangeEvent } from 'react';
import { CompactPicker } from 'react-color';
import { useController, useFormContext } from 'react-hook-form';

type InputProps = {
  label?: string;
  name: string;
};

export const InputColor = ({ label, name }: InputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <label className="flex flex-col items-start">
      {label && <span className="mb-2 text-xl">{label}</span>}
      <CompactPicker
        color={field.value}
        onChange={(ev) => {
          field.onChange({ target: { name, value: ev.hex } });
        }}
      />
    </label>
  );
};
