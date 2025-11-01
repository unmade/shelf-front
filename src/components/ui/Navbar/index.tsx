import { forwardRef } from 'react';

import { Button as UIButton, type ButtonProps as UIButtonProps } from '@headlessui/react';

interface NavbarProps {
  children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return <nav className="flex flex-1 items-center gap-4 py-2.5">{children}</nav>;
}

const navbarItemStyles = [
  'relative flex min-w-0 items-center gap-3 rounded-lg',
  'p-2',
  'focus:outline-none',
  'text-left text-base/6 font-medium sm:text-sm/5',
  'text-gray-950 dark:text-white',
  '*:data-[slot=icon]:size-6 sm:*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0',
  '*:data-[slot=icon]:fill-gray-500 dark:*:data-[slot=icon]:fill-zinc-400',
  // active
  'data-active:bg-gray-950/5 data-hover:bg-gray-950/5',
  'data-active:*:data-[slot=icon]:fill-gray-950',
  'dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
  'dark:data-active:*:data-[slot=icon]:fill-white',
  // hover
  'data-hover:*:data-[slot=icon]:fill-gray-950',
  'dark:data-hover:*:data-[slot=icon]:fill-white',
].join(' ');

export const NavbarItem = forwardRef(function NavbarItem(
  { children, className = '', ...props }: UIButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <span className="relative">
      <UIButton ref={ref} className={`${navbarItemStyles} ${className}`} {...props}>
        {children}
      </UIButton>
    </span>
  );
});

export function NavbarSection({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`flex items-center gap-3 ${className}`} {...props} />;
}

export function NavbarSpacer({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`-ml-4 flex-1 ${className}`} {...props} />;
}
