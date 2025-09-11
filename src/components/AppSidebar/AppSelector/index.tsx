import { NavLink } from 'react-router';

import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import { type AppConfig } from 'types/AppConfig';

import * as icons from 'icons';

import { useAvailableApps } from 'hooks/available-apps';

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
    <div className="space-y-1 text-base">
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
    <UIPopover>
      <UIPopoverButton
        className="flex w-full items-center gap-2 rounded-lg p-2 text-2xl text-gray-900 focus:outline-none data-hover:bg-gray-950/5 dark:text-zinc-100 dark:data-hover:dark:bg-zinc-50/5"
        disabled={apps.length < 2}
      >
        <icons.AppLogo className="size-7 shrink-0" />
        <div className="flex w-full items-center justify-between rounded-xl">
          <div className="flex items-center gap-1.5">
            <span className="font-light">Shelf</span>
            <span className="font-medium">{title}</span>
          </div>
          {apps.length > 1 && <icons.ChevronDown className="size-5 sm:size-4" />}
        </div>
      </UIPopoverButton>

      <UIPopoverPanel
        anchor="bottom start"
        transition
        className={[
          'min-w-56 p-2',
          'z-40 rounded-xl',
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
