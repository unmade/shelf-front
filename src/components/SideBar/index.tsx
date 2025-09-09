import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from 'components/ui/Sidebar';

import AppSelector from './AppSelector';
import CurrentAccount from './CurrentAccount';
import { useSidebarContext } from './SidebarProvider';
import StorageUsed from './StorageUsed';

export default function SideBar() {
  const { app } = useSidebarContext();

  return (
    <Sidebar>
      <SidebarHeader>
        <AppSelector title={app.title} />
      </SidebarHeader>
      <SidebarBody>
        {app.menu.sections.map(({ key, title, items }) => (
          <SidebarSection key={key}>
            {title && <SidebarHeading>{title}</SidebarHeading>}
            {items.map(({ title, path, Icon, end }) => (
              <SidebarItem key={path} to={path!} end={end}>
                <Icon data-slot="icon" />
                <SidebarLabel>{title}</SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
        ))}
        <SidebarSpacer />
        <SidebarSection>
          <StorageUsed />
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter>
        <CurrentAccount />
      </SidebarFooter>
    </Sidebar>
  );
}
