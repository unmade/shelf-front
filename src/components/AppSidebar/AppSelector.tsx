import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { type AppConfig } from 'types/AppConfig';

import * as icons from 'icons';

import { useAvailableApps } from 'hooks/available-apps';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/ui/sidebar';

function AppListItem({ title, path, Icon }: Omit<AppConfig, 'key' | 'menu'>) {
  return (
    <NavLink to={path}>
      <DropdownMenuItem>
        <Icon className="size-6 sm:size-5" />
        <span>{title}</span>
      </DropdownMenuItem>
    </NavLink>
  );
}

interface AppListProps {
  items: AppConfig[];
}

function AppList({ items }: AppListProps) {
  return (
    <>
      {items.map(({ title, path, Icon }) => (
        <AppListItem key={path} title={title} path={path} Icon={Icon} />
      ))}
    </>
  );
}

interface Props {
  title: string;
}

export default function AppSelector({ title }: Props) {
  const { t } = useTranslation();

  const apps = useAvailableApps();

  if (apps.length < 2) {
    return (
      <div className="text-foreground flex w-full items-center gap-2 rounded-lg p-2 text-2xl/8 sm:text-xl/8">
        <icons.AppLogo className="size-7 shrink-0" />
        <div className="flex w-full items-center justify-between rounded-xl">
          <div className="flex items-center gap-1.5">
            <span className="font-light">Shelf</span>
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className={[
                // Layout
                'justify-between px-2',
                // Hover states
                'hover:bg-sidebar-accent',
                // Open states
                'data-[state=open]:bg-sidebar-accent',
              ].join(' ')}
              size="lg"
            >
              <div className="flex items-center gap-2">
                <icons.AppLogo className="size-7 shrink-0" />
                <div className="text-foreground flex items-center gap-1 text-2xl/8 leading-tight sm:text-xl/8">
                  <span className="font-light">Shelf</span>
                  <span className="font-medium">{title}</span>
                </div>
              </div>
              <icons.ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56">
            <DropdownMenuLabel>{t('Applications')}</DropdownMenuLabel>
            <AppList items={apps} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
