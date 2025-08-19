import {
  Checkbox as UICheckbox,
  Field as UIField,
  type CheckboxProps as UICheckboxProps,
  type FieldProps as UIFieldProps,
} from '@headlessui/react';

const base = [
  'group block rounded',
  'size-4.5 sm:size-4',
  'bg-white dark:bg-white/5',
  'border border-gray-950/10 dark:border-white/10',
  'data-hover:border-gray-950/20 dark:data-hover:border-white/20',
  'data-checked:bg-blue-500 dark:data-checked:bg-indigo-500',
  'transition',
].join(' ');

export function Checkbox({ className = '', ...props }: UICheckboxProps) {
  return (
    <UICheckbox data-slot="control" className={`${className} ${base}`} {...props}>
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

export default Checkbox;

export function CheckboxField({ className, ...props }: UIFieldProps) {
  return (
    <UIField
      data-slot="field"
      {...props}
      className={[
        className,
        'grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]',
        // control
        '*:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1',
        '*:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1',
        // label
        '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
        // description
        '*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2',
        'has-data-[slot=description]:**:data-[slot=label]:font-medium',
        // error
        '*:data-[slot=error]:col-start-2 *:data-[slot=error]:row-start-3',
      ].join(' ')}
    />
  );
}
