import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import FileDrop from '../containers/FileDrop';

import VList from './ui/VList';

const HEADER_HEIGHT = 48;

const headerStyles = {
  height: `${HEADER_HEIGHT}px`,
};

const emptyStyles = {
  marginTop: `${-HEADER_HEIGHT}px`,
};

function TableHeader() {
  return (
    <div
      style={headerStyles}
      className="flex flex-row items-center text-sm font-bold text-gray-700 px-8"
    >
      <div className="flex-1">
        Name
      </div>
      <div className="w-32 px-6 text-right">
        Size
      </div>
      <div className="w-40 px-4 text-left">
        Modified
      </div>
    </div>
  );
}

function Table({ className, items, itemRender }) {
  const fileDropBorder = 'transition ease-in-out duration-75 border-4 rounded-lg';
  return (
    <>
      <TableHeader />
      {(items.length) ? (
        <VList
          items={items}
          itemRender={itemRender}
          heightOffset={HEADER_HEIGHT}
          className={`${fileDropBorder} ${className}`}
        />
      ) : (
        <div className={`h-full flex flex-col items-center justify-center ${fileDropBorder} ${className}`}>
          <div className="text-center" style={emptyStyles}>
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

function FileTableView({ path, droppable, items, itemRender }) {
  if (droppable) {
    return (
      <FileDrop
        uploadTo={path}
        className="h-full"
        render={({ dragging }) => (
          <Table
            items={items}
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
  path: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  droppable: PropTypes.bool,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

FileTableView.defaultProps = {
  droppable: false,
};

export default FileTableView;
