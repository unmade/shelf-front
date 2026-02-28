import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { Folder, ChevronDown } from 'icons';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/ui/dropdown-menu';

import { type BreadcrumbItem } from './types';

interface Props {
  items: BreadcrumbItem[];
}

export function BreadcrumbDropdown({ items }: Props) {
  const currentFolder = items[items.length - 1];
  const rest = items.slice(0, -1);

  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!rest.length) {
    return (
      <Button variant="ghost">
        <span className="max-w-40 truncate text-lg sm:max-w-sm">{currentFolder.name}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="max-w-40 truncate text-lg sm:max-w-sm">{currentFolder.name}</span>
          <ChevronDown data-slot="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-xs" side="bottom" align="start">
        {rest.map((item) => (
          <DropdownMenuItem key={item.key}>
            {item.url != null ? (
              <NavLink to={item.url} className="flex max-w-xs items-center px-4 py-2">
                {item.Icon ? (
                  <item.Icon className="size-6 shrink-0 sm:size-4" />
                ) : (
                  <Folder className="size-6 shrink-0 text-blue-400 sm:size-4" />
                )}
                <div className="ml-3 truncate">{item.name}</div>
              </NavLink>
            ) : (
              <span>{item.name}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
