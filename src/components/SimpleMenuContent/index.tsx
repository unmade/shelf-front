import { Fragment } from 'react';

import {
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/ui/dropdown-menu';

interface ActionItem {
  key: string;
  danger: boolean;
  Icon: React.ElementType;
  name: string;
  onClick: () => void;
}

interface Group {
  key: string;
  items: ActionItem[];
}

export interface SimpleMenuContentProps {
  side?: DropdownMenuContentProps['side'];
  align?: DropdownMenuContentProps['align'];
  groups: Group[];
}

export default function SimpleMenuContent({ groups, side, align }: SimpleMenuContentProps) {
  return (
    <DropdownMenuContent className="min-w-40" side={side} align={align}>
      {groups.map((section, idx) => (
        <Fragment key={section.key}>
          <DropdownMenuGroup>
            {section.items.map(({ key, danger, name, Icon, onClick }) => (
              <DropdownMenuItem
                key={key}
                variant={danger ? 'destructive' : 'default'}
                onClick={(event) => {
                  event.stopPropagation();
                  onClick();
                }}
              >
                <Icon />
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          {groups.length >= 2 && idx < groups.length - 1 && <DropdownMenuSeparator />}
        </Fragment>
      ))}
    </DropdownMenuContent>
  );
}
