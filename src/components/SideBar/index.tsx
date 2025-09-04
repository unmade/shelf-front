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

import CurrentAccount from './CurrentAccount';
import { useSidebarContext } from './SidebarProvider';
import StorageUsed from './StorageUsed';
import AppTitle from './AppTitle';

export default function SideBar() {
  const { app } = useSidebarContext();

  return (
    <Sidebar>
      <SidebarHeader>
        <AppTitle title={app.title} />
      </SidebarHeader>
      <SidebarBody>
        {app.menu.sections.map(({ key, title, items }) => (
          <SidebarSection key={key}>
            {title && <SidebarHeading>{title}</SidebarHeading>}
            {items.map(({ title, path, icon: Icon, end }) => (
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
