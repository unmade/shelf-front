import { Input as UIInput } from '@headlessui/react';

const inputStyles = [
  'relative block w-full rounded-lg',
  'appearance-none outline-hidden',
  'px-3.5 py-2.5 sm:px-3 sm:py-1.5',
  // background
  'bg-transparent dark:bg-white/5',
  // text
  'text-base/6 sm:text-sm/6',
  'text-gray-900 placeholder:text-gray-500 dark:text-white',
  // border
  'border border-gray-950/10',
  // hover
  'data-hover:border-gray-950/20 dark:border-white/10 dark:data-hover:border-white/20',
  // invalid state
  'data-invalid:border-red-500 data-invalid:data-hover:border-red-500',
  'dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500',
  // disabled state
  'data-disabled:border-gray-950/20 dark:data-disabled:border-white/15',
  'dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15',
].join(' ');

const spanStyles = [
  'relative block w-full',
  'before:absolute before:inset-px before:rounded-lg',
  'before:bg-white before:shadow-sm dark:before:hidden',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg',
  'after:ring-transparent after:ring-inset',
  'sm:focus-within:after:ring-2 sm:focus-within:after:ring-indigo-500',
  'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
  'has-data-invalid:before:shadow-red-500/10',
].join(' ');

type InputProps = React.ComponentProps<typeof UIInput>;

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <span data-slot="control" className={[spanStyles, className].join(' ')}>
      <UIInput className={inputStyles} {...props} />
    </span>
  );
}
