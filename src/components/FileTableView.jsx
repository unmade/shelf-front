import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import FileTableCell from '../containers/FileTableCell';

const HEIGHT = 64;

function FileTableView({ files }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <div>
          <div
            style={{ height: '32px', width, boxShadow: '-1px 1px 2px #f0f0f0' }}
            className="flex flex-row items-center space-x-4 text-sm font-bold bg-gray-100 text-gray-700 px-4"
          >
            <div>
              <input type="checkbox" />
            </div>
            <div className="w-3/4">
              Name
            </div>
            <div className="text-right">
              Size
            </div>
            <div className="w-1/4 text-center">
              Modified
            </div>
          </div>

          <div>
            <List
              height={height - 32}
              itemCount={files.length}
              itemData={files}
              itemSize={HEIGHT}
              width={width}
            >
              {({ data, index, style }) => (
                <div style={style}>
                  <FileTableCell uniqueKey={data[index]} />
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
