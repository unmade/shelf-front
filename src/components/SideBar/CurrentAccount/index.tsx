import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import { useGetCurrentAccountQuery } from 'store/accounts';

import * as icons from 'icons';

import Avatar from 'components/ui-legacy/Avatar';

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
      <UIPopoverButton className="w-full focus:outline-none">
        <div className="flex flex-row items-center">
          <Avatar username={displayName} className="size-10 shrink-0" />
          <div className="ml-2 flex min-w-0 flex-1 flex-col text-left">
            <div className="truncate text-sm font-semibold text-gray-700 dark:text-zinc-400">
              {displayName}
            </div>
          </div>
          <div>
            <icons.Selector className="size-5 text-gray-500 dark:text-zinc-500" />
          </div>
        </div>
      </UIPopoverButton>

      <UIPopoverPanel
        anchor="top start"
        transition
        className={[
          'z-40 w-(--button-width) rounded-2xl',
          '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
          'bg-white/75 shadow backdrop-blur dark:bg-zinc-800/75',
          'ring-1 ring-zinc-950/10 dark:ring-white/10',
          'transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
        ].join(' ')}
      >
        <Overlay fullName={fullName} email={email} username={username} />
      </UIPopoverPanel>
    </UIPopover>
  );
}
