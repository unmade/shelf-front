import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import FileDrop from '../containers/FileDrop';

import VList from './ui/VList';

const HEADER_HEIGHT = 48;

const headerStyles = {
  height: `${HEADER_HEIGHT}px`,
};

const height = {
  height: `calc(100% - ${HEADER_HEIGHT}px`,
};

function TableHeader() {
  return (
    <div
      style={headerStyles}
      className="w-full flex flex-row items-center text-sm font-bold text-gray-700 px-8"
    >
      <div className="flex-1">
        Name
      </div>
      <div className="hidden md:block w-32 px-6 text-right">
        Size
      </div>
      <div className="hidden md:block w-40 px-4 text-left">
        Modified
      </div>
    </div>
  );
}

function Table({ className, items, loading, itemRender }) {
  const fileDropBorder = 'transition ease-in-out duration-75 border-4 rounded-lg';
  if (!items.length && loading) {
    return (
      <>
        <TableHeader />
        <div className={`flex flex-col items-center justify-center ${className}`} style={height}>
          <icons.Spinner className="w-7 h-7 text-gray-600 animate-spin" />
        </div>
      </>
    );
  }
  return (
    <>
      <TableHeader />
      {(items.length) ? (
        <VList
          items={items}
          itemRender={itemRender}
          heightOffset={HEADER_HEIGHT}
          className={`${fileDropBorder} ${className}`}
          trackScrolling
        />
      ) : (
        <div className={`flex flex-col items-center justify-center ${fileDropBorder} ${className}`} style={height}>
          <div className="text-center">
            <icons.Collection className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-800 text-lg font-semibold">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop files to upload
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function FileTableView({
  items, loading, path, droppable, itemRender,
}) {
  if (droppable) {
    return (
      <FileDrop
        uploadTo={path}
        className="h-full"
        render={({ dragging }) => (
          <Table
            items={items}
            loading={loading}
            itemRender={itemRender}
            className={(dragging) ? 'border-blue-300' : 'border-transparent'}
          />
        )}
      />
    );
  }
  return <Table items={items} itemRender={itemRender} className="border-transparent" />;
}

FileTableView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  path: PropTypes.string.isRequired,
  droppable: PropTypes.bool,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

FileTableView.defaultProps = {
  loading: false,
  droppable: false,
};

export default FileTableView;
