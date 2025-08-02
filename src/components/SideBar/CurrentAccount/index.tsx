import { useGetCurrentAccountQuery } from 'store/accounts';

import * as icons from 'icons';

import Avatar from 'components/ui-legacy/Avatar';
import Dropdown from 'components/ui-legacy/Dropdown';

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
    <Dropdown
      overlay={<Overlay fullName={fullName} email={email} username={username} />}
      placement="top-end"
    >
      <div className="flex flex-row items-center lg:block xl:flex">
        <Avatar username={displayName} className="h-10 w-10 shrink-0" />
        <div className="ml-2 flex min-w-0 flex-1 flex-col text-left lg:hidden xl:flex">
          <div className="truncate text-sm font-semibold text-gray-700 dark:text-zinc-400">
            {displayName}
          </div>
        </div>
        <div className="block lg:hidden xl:block">
          <icons.Selector className="h-5 w-5 text-gray-500 dark:text-zinc-500" />
        </div>
      </div>
    </Dropdown>
  );
}
