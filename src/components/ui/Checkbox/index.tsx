import { Checkbox as UICheckbox, type CheckboxProps as UICheckboxProps } from '@headlessui/react';

const base = [
  'group block rounded',
  'size-4.5 sm:size-4',
  'bg-white dark:bg-white/5',
  'border border-gray-950/10 dark:border-white/10',
  'data-hover:border-gray-950/20 dark:data-hover:border-white/20',
  'data-checked:bg-blue-500 dark:data-checked:bg-indigo-500',
  'transition',
];

export default function Checkbox({ className = '', ...props }: UICheckboxProps) {
  return (
    <UICheckbox className={[...base, className].join(' ')} {...props}>
      <svg
        className="stroke-white opacity-0 transition group-data-checked:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          className="opacity-100 group-data-[indeterminate]:opacity-0"
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="opacity-0 group-data-[indeterminate]:opacity-100"
          d="M3 7H11"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </UICheckbox>
  );
}
