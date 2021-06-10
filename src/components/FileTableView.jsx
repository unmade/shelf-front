import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import FileDrop from '../containers/FileDrop';
import VList from '../containers/VList';

function TableHeader() {
  return (
    <div
      className="w-full px-8 py-4 flex flex-row items-center text-sm font-bold text-gray-700"
    >
      <div className="flex-1">
        Name
      </div>
      <div className="hidden md:block w-20 lg:w-24 text-right">
        Size
      </div>
      <div className="hidden md:block w-24 lg:w-36 xl:w-40 ml-6 xl:px-4 text-left">
        Modified
      </div>
    </div>
  );
}

function Table({
  className, items, loading, scrollKey, itemRender,
}) {
  const fileDropBorder = 'transition ease-in-out duration-75 border-4 rounded-lg';
  return (
    <div className="h-full flex flex-col">
      <TableHeader />
      <div className="flex-1">
        {(items.length || loading) ? (
          <VList
            items={items}
            itemRender={itemRender}
            className={`${fileDropBorder} ${className}`}
            trackScrolling
            scrollKey={scrollKey}
            loading={items.length === 0 && loading}
          />
        ) : (
          <div className={`h-full flex flex-col items-center justify-center ${fileDropBorder} ${className}`}>
            <icons.Collection className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-800 text-lg font-semibold">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop files to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTableView({
  droppable, items, loading, path, itemRender,
}) {
  if (droppable) {
    return (
      <FileDrop
        uploadTo={path}
        className="h-full"
        render={({ dragging }) => (
          <Table
            className={(dragging) ? 'border-blue-300' : 'border-transparent'}
            loading={loading}
            items={items}
            itemRender={itemRender}
            scrollKey={path}
          />
        )}
      />
    );
  }
  return (
    <Table
      className="border-transparent"
      items={items}
      itemRender={itemRender}
      scrollKey={path}
    />
  );
}

FileTableView.propTypes = {
  droppable: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

FileTableView.defaultProps = {
  droppable: false,
  loading: true,
};

export default FileTableView;
