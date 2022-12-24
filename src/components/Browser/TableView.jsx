import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectCurrentPath } from '../../store/browser';

import useSidePreview from '../../hooks/preview-available';

import FileDrop from '../../containers/FileDrop';

import FileTableCell from '../FileTableCell';
import FileTableView from '../FileTableView';

import { useBrowserData } from './BrowserDataProvider';
import SidePreview from './SidePreview';

function FileTableViewContainer({ droppable }) {
  const { pathname } = useLocation();

  const path = useSelector(selectCurrentPath);
  const { ids, loading } = useBrowserData();

  const fileTableView = (
    <FileTableView
      items={ids ?? []}
      loading={loading}
      scrollKey={pathname}
      itemRender={FileTableCell}
    />
  );

  return droppable ? (
    <FileDrop
      className="h-full"
      uploadTo={path}
      render={({ dragging }) => (
        <div className="relative h-full w-full">
          <div className={`${dragging ? 'block' : 'hidden'} absolute z-10 h-full w-full px-2 pb-2`}>
            <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
          </div>
          {fileTableView}
        </div>
      )}
    />
  ) : (
    fileTableView
  );
}

FileTableViewContainer.propTypes = {
  droppable: PropTypes.bool.isRequired,
};

function TableView({ droppable }) {
  const withSidePreview = useSidePreview();

  return (
    <>
      <div className={`easy-in-out h-full duration-500 ${withSidePreview ? 'w-7/12' : 'w-full'}`}>
        <FileTableViewContainer droppable={droppable} />
      </div>
      <Transition
        className="w-5/12 overflow-scroll"
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
    </>
  );
}

TableView.propTypes = {
  droppable: PropTypes.bool,
};

TableView.defaultProps = {
  droppable: false,
};

export default TableView;
