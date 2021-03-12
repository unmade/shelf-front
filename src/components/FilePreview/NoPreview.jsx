import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

import Button from '../ui/Button';
import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import FileIcon from '../FileIcon';

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
        <p className="text-xl font-medium text-gray-700 mb-2">
          Preview is not available
        </p>
        <Button
          type="primary"
          size="md"
          icon={<icons.Download />}
          onClick={() => onDownload(path)}
        >
          Download
        </Button>
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
