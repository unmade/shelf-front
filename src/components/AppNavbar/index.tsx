import { Navbar, NavbarSection, NavbarSpacer } from '@/ui/navbar';

import CurrentAccountDropdown from './CurrentAccountDropdown';

export default function AppNavbar() {
  return (
    <Navbar>
      <NavbarSpacer />
      <NavbarSection>
        <CurrentAccountDropdown />
      </NavbarSection>
    </Navbar>
  );
}
