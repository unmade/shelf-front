import React from 'react';
import PropTypes from 'prop-types';

import FileIcon from '../FileIcon';
import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

function NoPreview({ file, onDownload }) {
  const {
    name, path, mediatype, hidden, size, mtime,
  } = file;
  return (
    <div className="flex flex-col h-full items-center justify-center space-x-4 space-y-6">
      <FileIcon className="w-32 h-auto drop-shadow" mediatype={mediatype} hidden={hidden} />

      <div className="text-gray-800">
        <p className="text-gray-600 text-xs">
          {name}
          <span> &bull; </span>
          <FileSize size={size} />
          <span> &bull; </span>
          <TimeAgo mtime={mtime * 1000} />
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-medium text-gray-700">
          Preview is not available
        </p>
        <button
          type="button"
          className="mt-2 py-1 px-2 font-semibold text-white bg-blue-500 rounded"
          onClick={() => onDownload(path)}
        >
          Download
        </button>
      </div>
    </div>
  );
}

NoPreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    mtime: PropTypes.number.isRequired,
    mediatype: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default NoPreview;
