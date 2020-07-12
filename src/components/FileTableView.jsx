import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import FileTableCell from '../containers/FileTableCell';

const HEIGHT = 64;
const HEADER_HEIGHT = 48;

function FileTableView({ files }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <div>
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

          <div>
            <List
              height={height - HEADER_HEIGHT}
              itemCount={files.length}
              itemData={files}
              itemSize={HEIGHT}
              width={width}
            >
              {({ data, index, style }) => (
                <div style={style}>
                  <div
                    className={`h-full mx-4 rounded-lg ${(index % 2) ? 'bg-white' : 'bg-gray-100'}`}
                  >
                    <FileTableCell uniqueKey={data[index]} />
                  </div>
                </div>
              )}
            </List>
          </div>

        </div>
      )}
    </AutoSizer>
  );
}

FileTableView.propTypes = {
  files: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FileTableView;
