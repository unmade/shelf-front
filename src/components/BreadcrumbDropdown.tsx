import { NavLink } from 'react-router';

import { Selector, Folder } from 'icons';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/ui/dropdown-menu';

interface Props {
  items: {
    key: string;
    name: string;
    url?: string;
  }[];
}

export default function BreadcrumbDropdown({ items }: Props) {
  const [currentFolder, ...rest] = items;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="max-w-40 truncate sm:max-w-sm">{currentFolder.name}</span>
          {rest.length ? <Selector data-slot="icon" /> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        {rest.map((item) => (
          <DropdownMenuItem key={item.key}>
            {item.url != null ? (
              <NavLink to={item.url} className="flex max-w-xs items-center px-4 py-2">
                <Folder className="size-5 shrink-0 text-blue-400 sm:size-4" />
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
