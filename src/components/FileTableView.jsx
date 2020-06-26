import React from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import * as icons from '../icons';

const HEIGHT = 64;


function CellRenderer({ data, index, style }) {
  const { directory, files } = data;
  const item = files[index];

  return (
    <div style={style}>
      <div className="h-full flex flex-row items-center space-x-4 text-sm mx-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div>
          <input type="checkbox" />
        </div>
        <div className="w-3/4">
          <div className="flex flex-row items-center space-x-2">
            {(item.type === "folder") ? (
              <icons.Folder className="text-2xl text-blue-400" />
            ) : (
              <img 
                className="object-contain"
                style={{ width: '32px', height: '32px' }}
                src={`http://localhost:8000/static/${directory.path}/${item.path}`}
              />
            )}
            {(item.type === "folder") ? (
              <Link to={`/files/${directory.path}/${item.path}`} className="text-gray-800">
                {item.name}
              </Link>
            ) : (
              <Link to={`/files/${directory.path}?preview=${item.path}`} className="text-gray-800">
                {item.name}
              </Link>
            )}
          </div>
        </div>
        <div className="text-right text-gray-600">
          {item.size}
        </div>
        <div className="w-1/4 text-center text-gray-600">
          {item.modified_at}
        </div>
      </div>
    </div>
  )
}


function FileTableView({ data }) {
  const { files } = data;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div>
          <div
            style={{ height: '32px', width: width, boxShadow: '-1px 1px 2px #f0f0f0' }}
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
              itemData={data}
              itemSize={HEIGHT}
              width={width}
            >
              {CellRenderer}
            </List>
          </div>

        </div>
      )}
    </AutoSizer>
  )
}

export default FileTableView;
