import { useCurrentAccount } from '@/store/accounts';

import { Avatar, AvatarFallback } from '@/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { NavbarItem } from '@/ui/navbar';

import CurrentAccountDropdownContent from '@/components/CurrentAccountDropdown';

function DropdownButton() {
  const { account } = useCurrentAccount();

  if (!account) {
    return null;
  }

  const { initials } = account;

  return (
    <DropdownMenuTrigger asChild>
      <NavbarItem>
        <Avatar className="-m-0.5 size-7">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </NavbarItem>
    </DropdownMenuTrigger>
  );
}

export default function CurrentAccountDropdown() {
  return (
    <DropdownMenu>
      <DropdownButton />
      <CurrentAccountDropdownContent />
    </DropdownMenu>
  );
}
