import {
  Popover as UIPopover,
  PopoverBackdrop as UIPopoverBackdrop,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import SideBar from './AppSidebar';

import { createContext, useContext, useMemo } from 'react';

import type { AppConfig } from 'types/AppConfig';

const SidebarContext = createContext<{ app: AppConfig } | null>(null);

interface Props {
  children: React.ReactNode;
  app: AppConfig;
}

export function AppSidebarModalProvider({ children, app }: Props) {
  const value = useMemo(() => ({ app }), [app]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) {
    throw new Error('`useSidebarContext` must be used within a `SidebarProvider`');
  }
  return value;
}

export default function AppSidebarModal() {
  const { app } = useSidebarContext();

  return (
    <UIPopover>
      <UIPopoverButton as={Button} className="focus:outline-none" variant="plain" color="gray">
        <icons.Menu data-slot="icon" />
      </UIPopoverButton>

      <UIPopoverBackdrop
        transition
        className={[
          'fixed inset-0 z-20',
          'bg-gray-50/75 backdrop-blur dark:bg-zinc-900/75',
          'transition duration-150',
          'data-closed:opacity-0 data-enter:ease-out data-leave:ease-in',
        ].join(' ')}
      />
      <UIPopoverPanel
        transition
        className={[
          'fixed inset-0 z-20 w-64',
          'bg-white/75 backdrop-blur dark:bg-zinc-800/75',
          'border-r border-zinc-950/10 dark:border-white/10',
          'transform transition duration-300 ease-out data-closed:-translate-x-full',
        ].join(' ')}
      >
        <SideBar app={app} />
      </UIPopoverPanel>
    </UIPopover>
  );
}
