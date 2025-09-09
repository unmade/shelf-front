import { NavLink } from 'react-router';

import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import { type AppConfig } from 'types/AppConfig';

import * as icons from 'icons';

import { useAvailableApps } from 'hooks/available-apps';

function AppLogo() {
  return (
    <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm lg:mr-0 xl:mr-3 dark:bg-zinc-800">
      <icons.AppLogo className="size-7 shrink-0" />
    </div>
  );
}

const defaultClasses = [
  'my-1 rounded-lg px-2',
  'flex items-center',
  'text-gray-900 hover:text-gray-950 dark:text-zinc-100 dark:hover:text-white',
  'hover:bg-gray-950/5 dark:hover:bg-zinc-50/5',
].join(' ');
const activeClasses = 'text-gray-950 bg-gray-950/5 font-medium dark:text-white dark:bg-zinc-50/5';

function AppListItem({ title, path, Icon }: Omit<AppConfig, 'key' | 'menu'>) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${defaultClasses} ${activeClasses}` : defaultClasses
      }
    >
      <Icon className={`mr-2 size-10`} />
      <span>{title}</span>
    </NavLink>
  );
}

interface AppListProps {
  items: AppConfig[];
}

function AppList({ items }: AppListProps) {
  return (
    <div className="min-w-56 space-y-1 px-2 py-2 text-base">
      {items.map(({ title, path, Icon }) => (
        <AppListItem key={path} title={title} path={path} Icon={Icon} />
      ))}
    </div>
  );
}

interface Props {
  title: string;
}

export default function AppSelector({ title }: Props) {
  const apps = useAvailableApps();

  return (
    <UIPopover className="text-gray-900 dark:text-zinc-100">
      <UIPopoverButton className="focus:outline-none" disabled={apps.length < 2}>
        <div className="mx-0 flex items-center px-1 py-2 text-2xl lg:mx-auto lg:py-1 xl:mx-0 xl:py-2">
          <AppLogo />
          <div className="flex w-full items-center justify-between rounded-xl p-1 text-2xl">
            <div className="flex items-center gap-1.5">
              <span className="font-light">Shelf</span>
              <span className="font-medium">{title}</span>
            </div>
            {apps.length > 1 && (
              <span className="pl-1">
                <icons.ChevronDown className="size-5" />
              </span>
            )}
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
