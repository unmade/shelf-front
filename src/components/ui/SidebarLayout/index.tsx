import {
  Popover as UIPopover,
  PopoverBackdrop as UIPopoverBackdrop,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import * as icons from 'icons';

import { NavbarItem } from '../Navbar';

type SidebarLayoutProps = React.PropsWithChildren<{
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
}>;

function SidebarModal({ children }: React.PropsWithChildren) {
  return (
    <UIPopover>
      <UIPopoverButton as={NavbarItem} className="focus:outline-none">
        <icons.MenuAlt4Solid data-slot="icon" />
      </UIPopoverButton>

      <UIPopoverBackdrop
        transition
        className={[
          'fixed inset-0 z-20',
          'bg-gray-50/75 backdrop-blur dark:bg-zinc-950/75',
          'transition duration-150',
          'data-closed:opacity-0 data-enter:ease-out data-leave:ease-in',
        ].join(' ')}
      />
      <UIPopoverPanel
        transition
        className={[
          'fixed inset-0 z-20 w-64',
          'bg-white/75 backdrop-blur dark:bg-zinc-900/75',
          'border-r border-zinc-950/10 dark:border-white/10',
          'transform transition duration-300 ease-out data-closed:-translate-x-full',
        ].join(' ')}
      >
        {children}
      </UIPopoverPanel>
    </UIPopover>
  );
}

export default function SidebarLayout({ navbar, sidebar, children }: SidebarLayoutProps) {
  return (
    <div className="relative isolate flex h-svh w-full bg-white max-lg:flex-col lg:bg-gray-100 dark:bg-zinc-900">
      <div className="w-64 max-lg:hidden">{sidebar}</div>

      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <SidebarModal>{sidebar}</SidebarModal>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="grow lg:bg-white dark:bg-zinc-900 dark:lg:bg-zinc-800">{children}</div>
      </main>
    </div>
  );
}
