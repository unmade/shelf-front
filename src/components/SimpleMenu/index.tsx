import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  type DropdownMenuProps,
  DropdownItem,
  DropdownSection,
  DropdownSeparator,
} from 'components/ui/DropdownMenu';

import { useCallback } from 'react';

export interface ActionItem {
  key: string;
  danger: boolean;
  Icon: React.ElementType;
  name: string;
  onClick: () => void;
}

interface Section {
  key: string;
  items: ActionItem[];
}

interface Props {
  children: React.ReactElement;
  placement?: DropdownMenuProps['anchor'];
  sections: Section[];
  onOpen?: () => void;
}

export default function SimpleMenu({
  children,
  placement = 'bottom end',
  sections,
  onOpen,
}: Props) {
  const onClickHandler = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onOpen) {
        onOpen();
      }
    },
    [onOpen],
  );

  return (
    <Dropdown>
      <DropdownButton
        variant="plain"
        color="gray"
        className="focus:outline-none"
        onClick={onClickHandler}
      >
        {children}
      </DropdownButton>
      <DropdownMenu anchor={placement}>
        {sections.map((section, idx) => (
          <>
            <DropdownSection key={section.key}>
              {section.items.map(({ key, danger, name, Icon }) => (
                <DropdownItem as="button" danger={danger} key={key}>
                  <Icon data-slot="icon" />
                  {name}
                </DropdownItem>
              ))}
            </DropdownSection>
            {sections.length > 2 && idx < sections.length - 1 && <DropdownSeparator />}
          </>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
