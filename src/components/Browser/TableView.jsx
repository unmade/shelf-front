import React from 'react';

import { Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

import useSidePreview from '../../hooks/preview-available';

import FileTableCell from '../FileTableCell';
import FileTableView from '../FileTableView';

import { useBrowserData } from './BrowserDataProvider';
import SidePreview from './SidePreview';

function FileTableViewContainer() {
  const { pathname } = useLocation();

  const { ids, loading } = useBrowserData();

  return (
    <FileTableView
      items={ids ?? []}
      loading={loading}
      scrollKey={pathname}
      itemRender={FileTableCell}
    />
  );
}

FileTableViewContainer.propTypes = {};

function TableView() {
  const withSidePreview = useSidePreview();

  return (
    <div className="flex h-full flex-row overflow-y-auto">
      <div className={`easy-in-out h-full duration-500 ${withSidePreview ? 'w-7/12' : 'w-full'}`}>
        <FileTableViewContainer />
      </div>
      <Transition
        className="w-5/12 overflow-y-auto"
        show={withSidePreview}
        enter="transform transition-all ease-in-out duration-500"
        enterFrom="w-0 translate-x-full"
        enterTo="w-5/12 translate-x-0"
        leave="transform transition-all ease-in-out duration-500"
        leaveFrom="w-5/12 translate-x-0"
        leaveTo="w-0 translate-x-full"
      >
        <SidePreview />
      </Transition>
    </div>
  );
}

TableView.propTypes = {};

export default TableView;
