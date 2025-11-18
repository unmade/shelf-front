import { useCurrentAccount } from '@/store/accounts';

import { ChevronUpSolid } from '@/icons';

import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { SidebarMenuButton } from '@/ui/sidebar';

import CurrentAccountDropdownContent from '@/components/CurrentAccountDropdown';

function CurrentAccountDropdownButton() {
  const { account } = useCurrentAccount();

  if (!account) {
    return null;
  }

  const { initials, username } = account;

  const displayName = account.displayName || `@${username}`;

  let emailOrUsername;
  if (account.email) {
    emailOrUsername = account.email;
  } else if (displayName !== `@${username}`) {
    emailOrUsername = `@${username}`;
  }

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        className="hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent justify-between px-2"
        size="lg"
      >
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left leading-tight">
          <span className="text-foreground truncate font-medium">{displayName}</span>
          {emailOrUsername && (
            <span className="text-muted-foreground truncate text-xs font-normal">
              {emailOrUsername}
            </span>
          )}
        </div>
        <ChevronUpSolid className="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
}

export default function CurrentAccountDropdown() {
  return (
    <DropdownMenu>
      <CurrentAccountDropdownButton />
      <CurrentAccountDropdownContent />
    </DropdownMenu>
  );
}
