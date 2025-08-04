import {
  Menu as UIMenu,
  MenuButton as UIMenuButton,
  MenuItems as UIMenuItems,
  MenuSection as UIMenuSection,
  MenuSeparator as UIMenuSeparator,
} from '@headlessui/react';

import type { Props as MenuItemProps } from './MenuItem';
import MenuItem from './MenuItem';
import { useCallback } from 'react';

const itemsClassName = [
  'w-max rounded-xl p-1 overflow-y-auto min-w-[10rem]',
  '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
  'outline outline-transparent focus:outline-hidden',
  'bg-white/75 dark:bg-zinc-800/75',
  'backdrop-blur-xl shadow-lg',
  'ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset',
  'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
].join(' ');

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';
type AnchorTo = `${Placement}` | `${Placement} ${Align}`;

interface Section {
  key: string;
  items: MenuItemProps[];
}

interface Props {
  children: React.ReactElement;
  placement?: AnchorTo;
  sections: Section[];
  onOpen?: () => void;
}

export default function Menu({ children, placement = 'bottom end', sections, onOpen }: Props) {
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
    <UIMenu>
      <UIMenuButton className="rounded-xl focus:outline-none" onClick={onClickHandler}>
        {children}
      </UIMenuButton>
      <UIMenuItems className={itemsClassName} anchor={placement} transition>
        {sections.map((section, idx) => (
          <>
            <UIMenuSection key={section.key}>
              {section.items.map((item) => (
                <MenuItem {...item} />
              ))}
            </UIMenuSection>
            {sections.length > 2 && idx < sections.length - 1 && (
              <UIMenuSeparator className="col-span-full mx-3.5 my-1 h-px border-0 bg-gray-950/5 sm:mx-3 dark:bg-white/10" />
            )}
          </>
        ))}
      </UIMenuItems>
    </UIMenu>
  );
}
