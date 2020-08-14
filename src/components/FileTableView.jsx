import React from 'react';
import PropTypes from 'prop-types';

import FileDrop from '../containers/FileDrop';
import FileTableCell from '../containers/FileTableCell';

import List from './List';

const HEADER_HEIGHT = 48;

const headerStyles = {
  height: `${HEADER_HEIGHT}px`,
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

function FileTableView({ baseDir, files }) {
  return (
    <FileDrop
      baseDir={baseDir}
      className="h-full"
      render={({ dragging }) => (
        <>
          <TableHeader />
          <List
            items={files}
            itemRender={FileTableCell}
            heightOffset={HEADER_HEIGHT}
            className={`transition ease-in duration-75 border-4 rounded-lg ${(dragging) ? 'border-blue-300' : 'border-transparent'}`}
          />
        </>
      )}
    />
  );
}

FileTableView.propTypes = {
  baseDir: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.number).isRequired,
};

FileTableView.defaultProps = {
  baseDir: '.',
};

export default FileTableView;
