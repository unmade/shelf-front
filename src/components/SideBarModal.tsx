import { useState } from 'react';

import {
  Dialog as UIDialog,
  DialogPanel as UIDialogPanel,
  DialogBackdrop as UIDialogBackdrop,
} from '@headlessui/react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import SideBar from './SideBar';

export default function SideBarModal() {
  const [visible, setVisible] = useState(false);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <>
      <Button variant="plain" color="gray" onClick={open}>
        <icons.Menu data-slot="icon" />
      </Button>

      <UIDialog
        as="div"
        open={visible}
        onClose={close}
        transition
        className="fixed inset-0 z-40 overflow-hidden transition duration-300 ease-in-out focus:outline-none lg:hidden"
      >
        <UIDialogBackdrop className="fixed inset-0 bg-gray-50/75 backdrop-blur dark:bg-zinc-900/75" />

        <UIDialogPanel
          transition
          className="fixed inset-0 max-w-2xs transform border-r border-zinc-950/10 bg-white/75 backdrop-blur transition duration-300 ease-out data-closed:-translate-x-full dark:border-white/10 dark:bg-zinc-800/75"
        >
          <SideBar />
        </UIDialogPanel>
      </UIDialog>
    </>
  );
}
