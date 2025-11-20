import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

interface NavbarProps {
  children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav data-slot="navbar" className="flex flex-1 items-center gap-4 py-2.5">
      {children}
    </nav>
  );
}

const navbarItemStyles = [
  'relative flex min-w-0 items-center gap-3 rounded-lg',
  'p-2',
  'focus:outline-none',
  'text-left text-base/6 font-medium sm:text-sm/5',
  'text-foreground',
  "[&_svg:not([class*='size-'])]:size-6 sm:[&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
  '[&_svg]:fill-muted-foreground',
  // active
  'active:bg-gray-950/5 dark:active:bg-white/5',
  'active:*:[&_svg]:fill-foreground',
  // hover
  'hover:bg-gray-950/5 dark:hover:bg-white/5',
  'hover:*:[&_svg]:fill-foreground',
].join(' ');

export const NavbarItem = forwardRef(function NavbarItem(
  {
    asChild,
    className = '',
    ...props
  }: React.ComponentProps<'button'> & {
    asChild?: boolean;
  },
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-slot="navbar-item"
      className={cn(navbarItemStyles, className)}
      {...props}
    />
  );
});

export function NavbarSection({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="navbar-section"
      className={cn('flex items-center gap-3', className)}
      {...props}
    />
  );
}

export function NavbarSpacer({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="navbar-spacer" className={cn('-ml-4 flex-1', className)} {...props} />;
}
