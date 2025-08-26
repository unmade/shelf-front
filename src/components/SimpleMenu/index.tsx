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
        <>
          <DropdownSection key={section.key}>
            {section.items.map(({ key, danger, name, Icon }) => (
              <DropdownItem key={key} as="button" danger={danger}>
                <Icon data-slot="icon" />
                {name}
              </DropdownItem>
            ))}
          </DropdownSection>
          {sections.length > 2 && idx < sections.length - 1 && <DropdownSeparator />}
        </>
      ))}
    </DropdownMenu>
  );
}
