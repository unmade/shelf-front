import { Fragment } from 'react';

import {
  DropdownMenu,
  type DropdownMenuProps,
  DropdownItem,
  DropdownSection,
  DropdownSeparator,
} from 'components/ui/DropdownMenu';

export interface ActionItem {
  key: string;
  danger: boolean;
  Icon: React.ElementType;
  name: string;
  onClick: () => void;
}

export interface Section {
  key: string;
  items: ActionItem[];
}

export interface SimpleMenuProps {
  placement?: DropdownMenuProps['anchor'];
  sections: Section[];
}

export default function SimpleMenu({ placement = 'bottom end', sections }: SimpleMenuProps) {
  return (
    <DropdownMenu anchor={placement} className="min-w-[10rem]">
      {sections.map((section, idx) => (
        <Fragment key={section.key}>
          <DropdownSection>
            {section.items.map(({ key, danger, name, Icon, onClick }) => (
              <DropdownItem key={key} as="button" danger={danger} onClick={onClick}>
                <Icon data-slot="icon" />
                {name}
              </DropdownItem>
            ))}
          </DropdownSection>
          {sections.length > 2 && idx < sections.length - 1 && <DropdownSeparator />}
        </Fragment>
      ))}
    </DropdownMenu>
  );
}
