import { NavLink } from 'react-router';

import {
  Disclosure as UIDisclosure,
  DisclosureButton as UIDisclosureButton,
  DisclosurePanel as UIDisclosurePanel,
} from '@headlessui/react';

import * as icons from 'icons';

import Dropdown from 'components/ui-legacy/Dropdown';

import Item from './Item';

interface OverlayProps {
  items: {
    title: string;
    path: string;
  }[];
}

function Overlay({ items }: OverlayProps) {
  return (
    <div className="ml-3 rounded-2xl px-4 py-3 text-base dark:bg-zinc-900">
      {items.map((item) => (
        <NavLink key={item.path} to={item.path}>
          {({ isActive }) => (
            <Item title={<span className="px-2">{item.title}</span>} active={isActive} />
          )}
        </NavLink>
      ))}
    </div>
  );
}

interface Props {
  title: string;
  icon: React.ElementType;
  items: {
    title: string;
    path: string;
  }[];
}

export default function ExpandableItem({ title, icon, items }: Props) {
  return (
    <>
      <UIDisclosure as="div">
        <UIDisclosureButton className="group w-full lg:hidden xl:block">
          <div className="flex w-full items-center justify-between">
            <Item title={title} icon={icon} />
            <icons.ChevronRight className="size-5 group-data-open:rotate-90 lg:hidden xl:block" />
          </div>
        </UIDisclosureButton>

        <UIDisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
        >
          {items.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <Item title={<span className="ml-5">{item.title}</span>} active={isActive} />
              )}
            </NavLink>
          ))}
        </UIDisclosurePanel>
      </UIDisclosure>

      <div className="hidden lg:block xl:hidden">
        <Dropdown placement="right" overlay={<Overlay items={items} />}>
          <div>
            <Item title={title} icon={icon} />
          </div>
        </Dropdown>
      </div>
    </>
  );
}
