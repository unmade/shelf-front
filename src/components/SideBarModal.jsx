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
        type="text"
        icon={<icons.Menu className="shrink-0 w-5 h-5" />}
        onClick={() => setVisible(true)}
      />
      <Transition
        show={visible}
        as={React.Fragment}
      >
        <UIDialog static open={visible} onClose={() => setVisible(false)} className="fixed inset-0 z-40 overflow-hidden lg:hidden">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UIDialog.Overlay className="bg-white absolute inset-0 backdrop-filter backdrop-blur bg-opacity-50" />
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
            <div className="absolute inset-0 z-40 flex pointer-events-none">
              <div className="flex-1 max-w-sm min-w-0 bg-opacity-75 border-r border-gray-400 pointer-events-auto border-opacity-10 bg-gray-100 backdrop-filter backdrop-blur firefox:bg-opacity-90">
                <SideBar />
              </div>
              <div className="w-24 pointer-events-none" aria-hidden="true" />
            </div>
          </Transition.Child>
        </UIDialog>
      </Transition>
    </>
  );
}

export default SideBarModal;

SideBarModal.propTypes = {};
