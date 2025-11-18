import { NavLink } from 'react-router';

import type { AppConfig } from 'types/AppConfig';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar';

import AppSelector from './AppSelector';
import CurrentAccountDropdown from './CurrentAccountDropdown';
import StorageUsed from './StorageUsed';

interface Props {
  app: AppConfig;
}

export default function AppSidebar({ app }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppSelector title={app.title} />
      </SidebarHeader>
      <SidebarContent>
        {app.menu.sections.map(({ key, title, items }) => (
          <SidebarGroup key={key}>
            {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ title, path, Icon, end }) => (
                  <SidebarMenuItem key={path}>
                    <NavLink to={path} end={end}>
                      {({ isActive }: { isActive: boolean }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <Icon />
                          <span>{title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <StorageUsed />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="max-lg:hidden">
        <CurrentAccountDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
