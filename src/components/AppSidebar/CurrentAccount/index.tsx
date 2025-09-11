import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import { useGetCurrentAccountQuery } from 'store/accounts';

import * as icons from 'icons';

import Avatar from 'components/ui/Avatar';

import Overlay from './Overlay';

export default function CurrentAccount() {
  const { account } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({ account: data }),
  });

  if (!account) {
    return null;
  }

  const { display_name: fullName, email, username } = account;
  const displayName = fullName || username;

  return (
    <UIPopover>
      <UIPopoverButton className="flex w-full items-center justify-between rounded-lg px-2 py-2 focus:outline-none data-hover:bg-gray-950/5 dark:data-hover:dark:bg-zinc-50/5">
        <div className="flex min-w-0 items-center gap-3 text-left">
          <Avatar username={displayName} className="size-10" />
          <span className="min-w-0">
            <span className="block truncate text-base/6 font-medium text-gray-950 sm:text-sm/5 dark:text-white">
              {fullName || `@${username}`}
            </span>
            {displayName && (
              <span className="block truncate text-sm/6 font-normal text-gray-500 sm:text-xs/5 dark:text-zinc-400">
                {email ?? `@${username}`}
              </span>
            )}
          </span>
        </div>
        <icons.ChevronUpIcon className="size-5 text-gray-500 sm:size-4 dark:text-zinc-400" />
      </UIPopoverButton>

      <UIPopoverPanel
        anchor="top start"
        transition
        className={[
          'px-2 pt-4 pb-2',
          'z-40 w-(--button-width) rounded-xl',
          '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
          'bg-white/75 shadow backdrop-blur dark:bg-zinc-800/75',
          'ring-1 ring-zinc-950/10 dark:ring-white/10',
          'transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
        ].join(' ')}
      >
        <Overlay />
      </UIPopoverPanel>
    </UIPopover>
  );
}
