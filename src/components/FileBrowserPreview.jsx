import React from 'react';
import PropTypes from 'prop-types';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileIcon from './FileIcon';
import FilePreviewActions from '../containers/FilePreviewActions';

// offset to match FileTableView
const styles = {
  height: '48px',
};

function FileBrowserPreview({ files }) {
  // currently preview only the first file
  const [file] = files;
  const {
    id, name, path, size, mtime, thumbnail,
  } = file;

  return (
    <div className="mx-4 mb-4 text-gray-800 bg-white rounded-lg">

      <div style={styles} />

      <div className="px-4 pb-2 flex flex-col">
        <div className="h-64 w-auto flex items-center justify-center rounded bg-gray-75">
          {(thumbnail !== null && thumbnail !== undefined) ? (
            <img
              className="rounded"
              srcSet={`${thumbnail}?size=256 1x, ${thumbnail}?size=512 2x`}
              alt="preview"
            />
          ) : (
            <FileIcon item={file} className="w-32 h-auto drop-shadow" />
          )}
        </div>

        <div className="p-4 flex flex-row justify-center space-x-8">
          <FilePreviewActions fileId={id} filePath={path} />
        </div>

        <div className="p-2 text-gray-800">
          <p className="text-xl font-semibold">{name}</p>
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
      thumbnail: PropTypes.string,
    }),
  ).isRequired,
};

export default FileBrowserPreview;
