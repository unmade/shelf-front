import React from 'react';

import * as icons from '../icons';

import FileSize from './FileSize';
import TimeAgo from './TimeAgo';

const iconStyles = {
  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))',
};

const styles = {
  height: 'calc(100% - 2rem',
};

function FilePreview({ file }) {
  if (!file) return null;

  return (
    <div
      style={styles}
      className="fixed top-0 right-0 m-4 text-gray-800 bg-white shadow-md w-1/4 z-10 rounded-lg"
    >
      <div className="w-full flex flex-row justify-between text-gray-700">
        <button
          type="button"
          className="w-6 h-6 m-2 rounded-full hover:bg-gray-200 hover:shadow-sm"
        >
          <icons.Close className="w-4 h-4 m-auto" />
        </button>
        <button
          type="button"
          className="w-6 h-6 m-2 text-xs hover:bg-blue-100 hover:text-blue-600 hover:shadow-sm rounded-full"
        >
          <icons.Download className="w-4 h-4 m-auto" />
        </button>
      </div>

      <div className="flex flex-col px-4">
        <div className="h-64 w-auto flex items-center justify-center rounded bg-gray-100">
          <icons.Folder style={iconStyles} className="w-32 h-auto text-blue-400" />
        </div>

        <div className="p-2 text-gray-800">
          <p className="text-xl font-semibold">{file.name}</p>
          <p className="text-gray-600 text-xs">
            <FileSize size={file.size} />
            <span> &bull; </span>
            <TimeAgo mtime={file.mtime * 1000} />
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-row justify-between">
        <button type="button" className="text-sm font-medium text-white uppercase bg-blue-500 rounded-full py-1 px-4 hover:shadow">
          open
        </button>
        <button type="button" className="font-medium text-blue-600 bg-blue-100 rounded-full p-2 hover:shadow-sm">
          <icons.More />
        </button>
      </div>

    </div>
  );
}

export default FilePreview;
