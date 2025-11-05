import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from 'components/ui/Navbar';

import {
  CurrentAccountDropdown,
  CurrentAccountDropdownAvatarButton,
  CurrentAccountDropdownPanel,
} from 'components/CurrentAccountDropdown';

export default function AppNavbar() {
  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <CurrentAccountDropdown>
          <CurrentAccountDropdownAvatarButton as={NavbarItem} />
          <CurrentAccountDropdownPanel />
        </CurrentAccountDropdown>
      </NavbarSection>
    </Navbar>
  );
}
