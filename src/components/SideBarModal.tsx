import {
  Popover as UIPopover,
  PopoverBackdrop as UIPopoverBackdrop,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import SideBar from './SideBar';

export default function SideBarModal() {
  return (
    <UIPopover>
      <UIPopoverButton className="focus:outline-none">
        <Button as="div" variant="plain" color="gray">
          <icons.Menu data-slot="icon" />
        </Button>
      </UIPopoverButton>

      <UIPopoverBackdrop
        transition
        className={[
          'fixed inset-0 z-20',
          'bg-gray-50/75 backdrop-blur dark:bg-zinc-900/75',
          'transition duration-150',
          'data-closed:opacity-0 data-enter:ease-out data-leave:ease-in',
        ].join(' ')}
      />
      <UIPopoverPanel
        transition
        className={[
          'fixed inset-0 z-20 max-w-2xs',
          'bg-white/75 backdrop-blur dark:bg-zinc-800/75',
          'border-r border-zinc-950/10 dark:border-white/10',
          'transform transition duration-300 ease-out data-closed:-translate-x-full',
        ].join(' ')}
      >
        <SideBar />
      </UIPopoverPanel>
    </UIPopover>
  );
}
