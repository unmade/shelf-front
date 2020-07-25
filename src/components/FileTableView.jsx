import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import FileDrop from '../containers/FileDrop';
import FileTableCell from '../containers/FileTableCell';

const HEIGHT = 64;
const HEADER_HEIGHT = 48;

function FileTableView({ baseDir, files }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FileDrop
          baseDir={baseDir}
          render={({ dragging }) => (
            <>
              <div
                style={{ height: `${HEADER_HEIGHT}px`, width }}
                className="flex flex-row items-center text-sm font-bold  text-gray-700 px-8"
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

              <List
                height={height - HEADER_HEIGHT}
                itemCount={files.length}
                itemData={files}
                itemSize={HEIGHT}
                width={width}
                className={`transition ease-in duration-75 border-4 rounded-lg ${(dragging) ? 'border-blue-300' : 'border-transparent'}`}
              >
                {({ data, index, style }) => (
                  <div style={style}>
                    <div className={`h-full mx-4 rounded-lg ${(index % 2) ? 'bg-white' : 'bg-gray-75'}`}>
                      <FileTableCell uniqueKey={data[index]} />
                    </div>
                  </div>
                )}
              </List>
            </>
          )}
        />
      )}
    </AutoSizer>
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
