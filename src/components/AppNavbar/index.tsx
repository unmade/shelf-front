import { Navbar, NavbarSection, NavbarSpacer } from 'components/ui/Navbar';

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
