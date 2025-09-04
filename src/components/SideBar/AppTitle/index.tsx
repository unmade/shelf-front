import * as icons from 'icons';

import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import useAvailableApps from '../hooks/available-apps';

import AppList from './AppList';

interface Props {
  title: string;
}

function AppLogo() {
  return (
    <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm lg:mr-0 xl:mr-3 dark:bg-zinc-800">
      <icons.AppLogo className="h-7 w-7 shrink-0" />
    </div>
  );
}

export default function AppTitle({ title }: Props) {
  const apps = useAvailableApps();

  if (apps.length < 2) {
    return (
      <div className="text-gray-900 dark:text-zinc-100">
        <div className="mx-0 flex items-center px-1 py-2 text-2xl lg:mx-auto lg:py-1 xl:mx-0 xl:py-2">
          <AppLogo />
          <div className="flex w-full items-center rounded-xl p-1 text-2xl">
            <span className="font-light tracking-tight">Shelf</span>
            <span className="pl-2 font-medium">{title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UIPopover className="text-gray-900 dark:text-zinc-100">
      <UIPopoverButton className="focus:outline-none">
        <div className="mx-0 flex items-center px-1 py-2 text-2xl lg:mx-auto lg:py-1 xl:mx-0 xl:py-2">
          <AppLogo />
          <div className="flex w-full items-center justify-between rounded-xl p-1 text-2xl">
            <div className="flex items-center">
              <span className="font-light tracking-tight">Shelf</span>
              <span className="pl-2 font-medium">{title}</span>
            </div>
            <span className="pl-1">
              <icons.ChevronDown className="h-5 w-5" />
            </span>
          </div>
        </div>
      </UIPopoverButton>

      <UIPopoverPanel
        anchor="bottom start"
        transition
        className={[
          'z-40 rounded-2xl',
          '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
          'bg-white/75 shadow backdrop-blur dark:bg-zinc-800/75',
          'ring-1 ring-zinc-950/10 dark:ring-white/10',
          'transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
        ].join(' ')}
      >
        <AppList items={apps} />
      </UIPopoverPanel>
    </UIPopover>
  );
}
