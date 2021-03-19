import React from 'react';
import PropTypes from 'prop-types';

import FilePreviewActions from '../containers/FilePreviewActions';
import Thumbnail from '../containers/Thumbnail';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileIcon from './FileIcon';

// offset to match FileTableView
const styles = {
  height: '48px',
};

const breakAnywhere = {
  overflowWrap: 'anywhere',
};

function getFontSize(len) {
  if (len > 128) {
    return 'text-sm';
  }
  if (len > 64) {
    return 'text-md';
  }
  return 'text-lg';
}

function FileBrowserPreview({ files }) {
  // currently preview only the first file
  const [file] = files;
  const {
    id, name, path, size, mtime, has_thumbnail: hasThumbnail,
  } = file;
  const fontSize = getFontSize(name.length);

  return (
    <div className="mx-4 mb-4 text-gray-800 bg-white rounded-lg">

      <div style={styles} />

      <div className="px-4 pb-2 flex flex-col">
        <div className="h-64 w-auto flex items-center justify-center rounded bg-gray-75">
          {(hasThumbnail) ? (
            <Thumbnail className="w-64 rounded" size="lg" file={file} />
          ) : (
            <FileIcon className="w-32 h-auto drop-shadow" mediatype={file.mediatype} hidden={file.hidden} />
          )}
        </div>

        <div className="p-4 flex flex-row justify-center space-x-8">
          <FilePreviewActions fileId={id} filePath={path} />
        </div>

        <div className="p-2 text-gray-800">
          <p className={`${fontSize} font-semibold break-words`} style={breakAnywhere}>
            {name}
          </p>
          <p className="text-gray-600 text-xs">
            <FileSize size={size} />
            <>
              <span> &bull; </span>
              <TimeAgo mtime={mtime * 1000} />
            </>
          </p>
        </div>
      </div>

    </div>
  );
}

FileBrowserPreview.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      mtime: PropTypes.number.isRequired,
      has_thumbnail: PropTypes.bool,
    }),
  ).isRequired,
};

export default FileBrowserPreview;
