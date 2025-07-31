import React from 'react';

import { Transition, TransitionChild } from '@headlessui/react';
import { useLocation } from 'react-router';

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
      <div
        className={`easy-in-out h-full overflow-y-auto transition-all duration-500 ${withSidePreview ? 'w-7/12' : 'w-full'}`}
      >
        <FileTableViewContainer />
      </div>
      <Transition show={withSidePreview}>
        <div className="w-5/12 transform transition-all duration-500 data-closed:w-0 data-closed:translate-x-full">
          <SidePreview />
        </div>
      </Transition>
    </div>
  );
}

TableView.propTypes = {};

export default TableView;
