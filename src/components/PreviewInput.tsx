import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

const PreviewInput = ({ index }: { index: number }) => {
  const textColor = useWatch({ name: 'textColor' });
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(`Imagem ${index + 1}`);
  const inputRef = useRef<HTMLInputElement>(null);
  return editing ? (
    <input
      className="w-full appearance-none rounded-none border-2 border-transparent bg-blue-100 px-2 text-center shadow-[_0_0_0_2px_rgb(29,78,216),0_0_0_3px_rgb(255,255,255)] outline-none"
      value={text}
      type="text"
      ref={inputRef}
      onChange={(ev) => setText(ev.target.value)}
      onBlur={() => setEditing(false)}
      onKeyUp={(ev) => {
        if (ev.key === 'Enter') {
          setEditing(false);
        }
      }}
    />
  ) : (
    <span
      className={classNames('text-center text-xl font-bold', {
        'text-white': textColor === 'white',
        'text-black': textColor === 'black',
      })}
      onClick={() => {
        setEditing(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }}
    >
      {text}
    </span>
  );
};

export default PreviewInput;
