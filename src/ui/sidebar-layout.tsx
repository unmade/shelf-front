import { Sheet, SheetTrigger, SheetContent } from '@/ui/sheet';

import { MenuIcon } from '@/icons';

import { NavbarItem } from '@/ui/navbar';

type SidebarLayoutProps = React.PropsWithChildren<{
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
}>;

function SidebarModal({ children }: React.PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild className="focus:outline-none">
        <NavbarItem>
          <MenuIcon />
        </NavbarItem>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 bg-white/75 backdrop-blur dark:bg-zinc-900/75">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export function SidebarLayout({ navbar, sidebar, children }: SidebarLayoutProps) {
  return (
    <div className="relative isolate flex h-svh w-full bg-white max-lg:flex-col lg:bg-gray-100 dark:bg-zinc-900">
      <div className="w-64 max-lg:hidden">{sidebar}</div>

      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <SidebarModal>{sidebar}</SidebarModal>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 lg:bg-white dark:bg-zinc-900 dark:lg:bg-zinc-800">
          {children}
        </div>
      </main>
    </div>
  );
}
