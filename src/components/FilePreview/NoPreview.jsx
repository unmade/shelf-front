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
    <div className="h-full flex flex-col items-center justify-center space-y-6">

      <div className="w-1/2 text-center space-y-2">
        <FileIcon className="w-32 h-auto mx-auto drop-shadow" mediatype={mediatype} hidden={hidden} />
        <p className="text-gray-700">
          {name}
        </p>
        <div className="text-gray-600 text-xs">
          <FileSize size={size} />
          <span> &bull; </span>
          <TimeAgo mtime={mtime * 1000} />
        </div>
      </div>

      <div className="text-center">
        <p className="text-xl font-medium text-gray-700 mb-2">
          Preview is not available
        </p>
        <Button
          type="primary"
          size="base"
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
