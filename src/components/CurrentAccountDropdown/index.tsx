import {
  Popover as UIPopover,
  type PopoverProps as UIPopoverProps,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import { useGetCurrentAccountQuery } from 'store/accounts';

import { ChevronUpSolid } from 'icons';

import Avatar from 'components/ui/Avatar';

import PanelContent from './PanelContent';

function useCurrentAccount() {
  const { account, isLoading, isError } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      account: data,
      isLoading,
      isError,
    }),
  });

  if (isError || !account) {
    return { account: null, isLoading: false };
  }

  return {
    account: {
      avatarName: account.display_name || account.username,
      displayName: account.display_name,
      email: account.email,
      username: account.username,
    },
    isLoading,
  };
}

interface ButtonProps {
  as?: React.ElementType;
  className?: string;
}

export function CurrentAccountDropdownAvatarButton({ as, className }: ButtonProps) {
  const { account } = useCurrentAccount();

  if (!account) {
    return null;
  }

  const { avatarName } = account;

  return (
    <UIPopoverButton as={as} className={className}>
      <Avatar username={avatarName} className="-m-0.5 size-7" />
    </UIPopoverButton>
  );
}

const buttonStyles = [
  'flex w-full items-center justify-between',
  'rounded-lg',
  'p-1.5 lg:p-2 ',
  'focus:outline-none',
  'data-hover:bg-gray-950/5 dark:data-hover:dark:bg-zinc-50/5',
].join(' ');

export function CurrentAccountDropdownButton({ as, className = '' }: ButtonProps) {
  const { account } = useCurrentAccount();

  if (!account) {
    return null;
  }

  const { avatarName, username } = account;

  const displayName = account.displayName || `@${username}`;

  let emailOrUsername;
  if (account.email) {
    emailOrUsername = account.email;
  } else if (displayName !== `@${username}`) {
    emailOrUsername = `@${username}`;
  }

  return (
    <UIPopoverButton as={as} className={`${className} ${buttonStyles}`}>
      <div className="flex min-w-0 items-center gap-3 text-left">
        <Avatar username={avatarName} className="size-10" />
        <span className="min-w-0">
          <span className="block truncate text-base/6 font-medium text-gray-950 sm:text-sm/5 dark:text-white">
            {displayName}
          </span>
          {emailOrUsername && (
            <span className="block truncate text-sm/6 font-normal text-gray-500 sm:text-xs/5 dark:text-zinc-400">
              {emailOrUsername}
            </span>
          )}
        </span>
      </div>
      <ChevronUpSolid
        className="size-5 text-gray-500 sm:size-4 dark:text-zinc-400"
        data-slot="icon"
      />
    </UIPopoverButton>
  );
}

export function CurrentAccountDropdownPanel() {
  return (
    <UIPopoverPanel
      anchor="bottom end"
      transition
      className={[
        'px-2 pt-4 pb-2',
        'z-40 rounded-xl',
        'min-w-48 lg:w-(--button-width)',
        '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
        'bg-white/75 shadow backdrop-blur dark:bg-zinc-800/75',
        'ring-1 ring-zinc-950/10 dark:ring-white/10',
        'transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
      ].join(' ')}
    >
      <PanelContent />
    </UIPopoverPanel>
  );
}

export function CurrentAccountDropdown(props: UIPopoverProps) {
  return <UIPopover {...props} />;
}
