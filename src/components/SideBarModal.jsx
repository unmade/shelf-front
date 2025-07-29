import React from 'react';

import { Dialog as UIDialog, Transition } from '@headlessui/react';

import * as icons from '../icons';

import Button from './ui/Button';

import SideBar from './SideBar';

function SideBarModal() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button
        variant="text"
        size="base"
        icon={<icons.Menu className="h-5 w-5 shrink-0" />}
        onClick={() => setVisible(true)}
      />
      <Transition show={visible} as={React.Fragment}>
        <UIDialog
          static
          open={visible}
          onClose={() => setVisible(false)}
          className="fixed inset-0 z-40 overflow-hidden lg:hidden"
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UIDialog.Overlay className="absolute inset-0 bg-white/50 backdrop-blur backdrop-filter dark:bg-zinc-900/70" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="transition-all ease-out duration-300 transform"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all ease-in-out duration-300 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <div className="pointer-events-none absolute inset-0 z-40 flex">
              <div className="firefox:bg-opacity-90 border-opacity-10 pointer-events-auto max-w-sm min-w-0 flex-1 border-r border-gray-400 bg-gray-100/75 backdrop-blur backdrop-filter dark:bg-zinc-800/50">
                <SideBar />
              </div>
              <div className="pointer-events-none w-24" aria-hidden="true" />
            </div>
          </Transition.Child>
        </UIDialog>
      </Transition>
    </>
  );
}

export default SideBarModal;

SideBarModal.propTypes = {};
