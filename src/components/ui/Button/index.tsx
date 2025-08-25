import { Button as UIButton, type ButtonProps as UIButtonProps } from '@headlessui/react';
import { forwardRef } from 'react';

const base = [
  'relative isolate',
  'flex items-center justify-center gap-x-2 rounded-lg',
  'text-center text-base/6 sm:text-sm/6 font-semibold',
  'transition ease-in-out',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  '*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4',
  '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 sm:*:data-[slot=icon]:my-1',
  '*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center',
].join(' ');

const variants = {
  primary: {
    default: [
      'text-white',
      'bg-linear-to-br',
      'from-blue-500 to-indigo-500',
      'data-hover:from-blue-400 data-hover:to-indigo-400',
      'dark:from-blue-600 dark:to-indigo-600',
      'dark:data-hover:from-blue-500 dark:data-hover:to-indigo-500',
    ].join(' '),
    red: [
      'text-white',
      'bg-linear-to-br',
      'from-rose-500 to-red-500',
      'data-hover:from-rose-400 data-hover:to-red-400',
      'dark:from-rose-600 dark:to-red-600',
      'dark:data-hover:from-rose-500 dark:data-hover:to-red-500',
    ].join(' '),
    gray: [
      'text-white',
      'bg-linear-to-br',
      'from-gray-500 to-zinc-500',
      'data-hover:from-gray-400 data-hover:to-zinc-400',
      'dark:from-zinc-600 dark:to-neutral-600',
      'dark:data-hover:from-zinc-500 dark:data-hover:to-neutral-500',
    ].join(' '),
  },
  outline: {
    default: [
      'text-indigo-600 data-hover:text-indigo-700',
      'bg-transparent data-hover:bg-indigo-50',
      'border border-indigo-600 data-hover:border-indigo-700',
      'dark:text-indigo-100 dark:data-hover:text-indigo-50',
      'dark:bg-indigo-50/2.5 dark:data-hover:bg-indigo-700/30',
      'dark:border-indigo-500 dark:data-hover:border-indigo-400',
    ].join(' '),
    red: [
      'text-red-600 data-hover:text-red-700',
      'bg-transparent data-hover:bg-red-50',
      'border border-red-600 data-hover:border-red-700',
      'dark:text-rose-100 dark:data-hover:text-rose-50',
      'dark:border-rose-500 dark:data-hover:border-rose-500/90',
      'dark:bg-rose-50/2.5 dark:data-hover:bg-rose-700/30',
    ].join(' '),
    gray: [
      'text-gray-700 data-hover:text-gray-800',
      'bg-white data-hover:bg-gray-950/2.5',
      'border border-gray-300 data-hover:border-gray-400',
      'dark:text-zinc-50 dark:data-hover:text-zinc-100',
      'dark:border-zinc-500 dark:data-hover:border-zinc-500',
      'dark:bg-zinc-50/2.5 dark:data-hover:bg-zinc-50/5',
    ].join(' '),
  },
  plain: {
    default: [
      'text-indigo-600 data-hover:text-indigo-700',
      'data-hover:bg-indigo-950/5',
      'dark:text-indigo-500 dark:data-hover:text-indigo-400',
      'dark:data-hover:bg-indigo-700/50',
    ].join(' '),
    red: [
      'text-red-600 data-hover:text-red-700',
      'data-hover:bg-red-100',
      'dark:text-rose-500 dark:data-hover:text-rose-400',
      'dark:data-hover:bg-rose-800/30',
    ].join(' '),
    gray: [
      'text-gray-700 data-hover:text-gray-800',
      'data-hover:bg-gray-100',
      'dark:text-zinc-50 dark:data-hover:text-zinc-100',
      'dark:data-hover:bg-zinc-50/5',
    ].join(' '),
  },
  soft: {
    default: [
      'text-indigo-700 data-hover:text-indigo-700',
      'bg-indigo-200 data-hover:bg-indigo-200',
      'dark:text-indigo-100 dark:data-hover:text-indigo-50',
      'dark:bg-indigo-700/50 dark:data-hover:bg-indigo-600/90',
    ].join(' '),
    red: [
      'text-red-600 data-hover:text-red-700',
      'bg-red-50 data-hover:bg-red-100',
      'dark:text-rose-100 dark:data-hover:text-rose-50',
      'dark:bg-rose-800/50 dark:data-hover:bg-rose-700/90',
    ].join(' '),
    gray: [
      'text-gray-700 data-hover:text-gray-800',
      'bg-gray-50 data-hover:bg-gray-100',
      'dark:text-zinc-100 dark:data-hover:text-zinc-50',
      'dark:bg-zinc-600/90 dark:data-hover:bg-zinc-500/90',
    ].join(' '),
  },
};

const paddings = {
  default: 'px-3.5 py-2.5 sm:px-3 sm:py-1.5',
};

interface Props {
  color?: 'default' | 'red' | 'gray';
  innerRef?: React.Ref<HTMLButtonElement>;
  variant?: 'outline' | 'plain' | 'primary' | 'soft';
}

export default forwardRef(function Button(
  {
    className = '',
    children,
    color = 'default',
    variant = 'primary',
    ...props
  }: Props & UIButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = [className, base, variants[variant][color], paddings.default].join(' ');
  return (
    <UIButton ref={ref} className={classNames} {...props}>
      {children}
    </UIButton>
  );
});
