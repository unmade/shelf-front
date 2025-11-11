import { NavLink } from 'react-router';

import { Selector, Folder } from 'icons';

import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'components/ui/DropdownMenu';

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
    <Dropdown>
      <DropdownButton variant="plain" color="gray">
        <span className="max-w-[10rem] truncate sm:max-w-sm">{currentFolder.name}</span>
        {rest.length ? <Selector data-slot="icon" /> : null}
      </DropdownButton>
      <DropdownMenu>
        {rest.map((item) => (
          <DropdownItem key={item.key}>
            {item.url != null ? (
              <NavLink to={item.url} className="flex max-w-xs items-center px-4 py-2">
                <Folder className="size-5 shrink-0 text-blue-400 sm:size-4" />
                <div className="ml-3 truncate">{item.name}</div>
              </NavLink>
            ) : (
              <span>{item.name}</span>
            )}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
