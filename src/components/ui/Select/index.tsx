import { Select as UISelect, type SelectProps as UISelectProps } from '@headlessui/react';
import { ChevronDown } from 'icons';

const styles = {
  base: [
    'w-full',
    // padding
    'py-2.5 sm:py-1.5 pr-10 pl-3.5 sm:pr-9 sm:l-3',
    // appearance
    'rounded-lg',
    'appearance-none focus:outline-none',
    // text
    '[&_optgroup]:font-semibold text-base/6 sm:text-sm/6 ',
    'text-gray-900 dark:text-white dark:*:text-white placeholder:text-gray-500',
    // background
    'bg-transparent dark:bg-white/5 dark:*:bg-zinc-800 dark:data-disabled:bg-white/2.5',
    // border
    'border',
    'border-gray-950/10 data-hover:border-gray-950/20',
    'dark:border-white/10 dark:data-hover:border-white/20',
    // invalid states
    'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
    'dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600',
    // disabled states
    'data-disabled:border-gray-950/20 data-disabled:opacity-100',
    'dark:data-disabled:border-white/15 dark:data-hover:data-disabled:border-white/15',
  ].join(' '),
};

export default function Select({ children, className = '', ...props }: UISelectProps) {
  return (
    <div data-slot="control" className="relative w-full rounded-lg shadow-xs dark:shadow-none">
      <UISelect className={`${styles.base} ${className}`} {...props}>
        {children}
      </UISelect>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDown
          className="size-5 text-gray-500 sm:size-4 dark:text-zinc-400"
          data-slot="icon"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
