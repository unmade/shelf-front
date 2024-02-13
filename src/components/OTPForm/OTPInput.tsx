import React from 'react';

interface Props {
  error: boolean;
  innerRef: (element: HTMLInputElement) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function OTPInput({ error, innerRef, onChange, onKeyDown }: Props) {
  const borderColor = error
    ? 'border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-rose-500 dark:focus:border-rose-300 dark:focus:ring-rose-500'
    : 'border-gray-300 focus:ring-blue-100 focus:border-blue-300 dark:border-zinc-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-300';

  return (
    <input
      ref={innerRef}
      className={`h-12 w-12 appearance-none rounded-lg p-2 text-center text-gray-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 ${borderColor}`}
      inputMode="numeric"
      type="text"
      pattern="[0-9]*"
      minLength={1}
      maxLength={1}
      min="1"
      max="1"
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
