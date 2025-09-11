import type { NavLinkProps } from 'react-router';
import { NavLink } from 'react-router';

interface SidebarProps {
  children: React.ReactNode;
}

const sidebarStyles = ['h-full w-full sm:w-64', 'text-gray-500 dark:text-zinc-400'].join(' ');

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className={sidebarStyles}>
      <nav className="flex h-full min-h-0 flex-col">{children}</nav>
    </div>
  );
}

export function SidebarBody({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8 ${className}`}
      {...props}
    />
  );
}

export function SidebarFooter({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`flex flex-col border-t border-gray-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5 ${className}`}
      {...props}
    />
  );
}

export function SidebarHeader({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`flex flex-col border-b border-gray-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5 ${className}`}
      {...props}
    />
  );
}

export function SidebarHeading({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`mb-1 px-3 text-sm/6 font-medium text-gray-400 sm:text-xs/6 dark:text-zinc-500 ${className}`}
      {...props}
    />
  );
}

const sidebarItemStyles = [
  'flex w-full items-center gap-3',
  'px-3 py-2.5 sm:py-2',
  'rounded-lg',
  'text-left text-base/6 font-medium sm:text-sm/5',
  '*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0',
  'sm:*:data-[slot=icon]:size-5',
  '*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4',
].join(' ');

const sideBarItemActiveStyles = 'bg-gray-950/10 text-gray-800 dark:bg-zinc-50/5 dark:text-zinc-300';

export function SidebarItem({ to, children, className = '', ...rest }: NavLinkProps) {
  return (
    <span className="relative">
      <NavLink
        to={to}
        className={({ isActive, isTransitioning }) =>
          [
            className,
            sidebarItemStyles,
            isActive || isTransitioning ? sideBarItemActiveStyles : '',
          ].join(' ')
        }
        {...rest}
      >
        {children}
      </NavLink>
    </span>
  );
}

export function SidebarLabel({ className = '', ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span className={`truncate ${className}`} {...props} />;
}

export function SidebarSection({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="section" className={`flex flex-col gap-1.5 ${className}`} {...props} />;
}

export function SidebarSpacer({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div aria-hidden="true" className={`mt-8 flex-1 ${className}`} {...props} />;
}
