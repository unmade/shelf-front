import { useCurrentAccount } from '@/store/accounts';

import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/ui/avatar';

import { NavbarItem } from '@/components/ui/Navbar';

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
        <Avatar>
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
