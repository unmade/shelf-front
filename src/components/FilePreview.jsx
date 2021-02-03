import React from 'react';

import * as icons from '../icons';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileIcon from './FileIcon';

function FilePreview({ files, onClose }) {
  let name; let size; let mtime;

  if (files.length > 1) {
    name = `${files.length} items`;
    size = files.map((file) => file.size).reduce((acc, value) => acc + value);
    mtime = null;
  } else {
    const [file] = files;
    name = file.name;
    size = file.size;
    mtime = file.mtime;
  }

  return (
    <div className="mx-4 mb-4 text-gray-800 bg-white z-10 rounded-lg">
      <div className="w-full px-4 py-2 flex flex-row justify-between text-gray-600">
        <button
          type="button"
          title="Close preview"
          className="w-6 h-6 hover:text-gray-800"
          onClick={onClose}
        >
          <icons.Close className="w-4 h-4 m-auto" />
        </button>
        <button
          type="button"
          title="Download"
          className="w-6 h-6 text-xs hover:text-gray-800"
        >
          <icons.Download className="w-4 h-4 m-auto" />
        </button>
      </div>

      <div className="flex flex-col px-4">
        <div className="h-64 w-auto flex items-center justify-center rounded bg-gray-75">
          {files.map((item) => (
            <FileIcon key={item.id} item={item} className="w-32 h-auto drop-shadow" />
          ))}
        </div>

        <div className="p-2 text-gray-800">
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-gray-600 text-xs">
            <FileSize size={size} />
            {(mtime) && (
              <>
                <span> &bull; </span>
                <TimeAgo mtime={mtime * 1000} />
              </>
            )}
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
