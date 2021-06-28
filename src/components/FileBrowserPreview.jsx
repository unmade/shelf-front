import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';

import FilePreviewActions from '../containers/FilePreviewActions';
import Thumbnail from '../containers/Thumbnail';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileIcon from './FileIcon';

function getFontSize(len) {
  if (len > 128) {
    return 'text-sm';
  }
  if (len > 64) {
    return 'text-md';
  }
  return 'text-lg';
}

function pluralize(noun, count, suffix = 's') {
  return `${noun}${count !== 1 ? suffix : ''}`;
}

function countByTypeText(totalCount, folderCount) {
  const documentCount = totalCount - folderCount;
  const documentText = `${documentCount} ${pluralize('document', documentCount)}`;
  const folderText = `${folderCount} ${pluralize('folder', folderCount)}`;
  if (documentCount > 0 && folderCount === 0) {
    return documentText;
  }
  if (documentCount === 0 && folderCount > 0) {
    return folderText;
  }
  return `${documentText}, ${folderText}`;
}

function SingleFilePreview({ file }) {
  const {
    id, name, path, size, mtime, has_thumbnail: hasThumbnail,
  } = file;
  const fontSize = getFontSize(name.length);

  return (
    <>
      <div className="px-4 pb-2 flex flex-col">
        <div className="h-64 w-auto flex items-center justify-center rounded-xl bg-gray-50">
          {(hasThumbnail) ? (
            <Thumbnail className="w-64 h-64 flex-shrink-0" size="lg" file={file} />
          ) : (
            <FileIcon className="w-56 h-56 flex-shrink-0 filter drop-shadow" mediatype={file.mediatype} hidden={file.hidden} />
          )}
        </div>

        <div className="p-4 flex flex-row justify-center space-x-8">
          <FilePreviewActions id={id} path={path} />
        </div>

        <div className="p-2 text-gray-800">
          <p className={`${fontSize} font-semibold break-words`}>
            {name}
          </p>
          <p className="text-gray-600 text-xs">
            <FileSize size={size} />
            <span className="px-1">&bull;</span>
            <TimeAgo mtime={mtime * 1000} />
          </p>
        </div>
      </div>
    </>
  );
}

function MultiFilePreview({ files }) {
  const size = files.reduce((acc, item) => acc + item.size, 0);
  const previews = files.slice(-3);

  let folderCount = 0;
  files.forEach((item) => {
    if (item.mediatype === MediaType.FOLDER) {
      folderCount += 1;
    }
  });

  return (
    <>
      <div className="px-4 pb-2 flex flex-col">
        <div className="h-64 w-auto flex items-center justify-center rounded-xl bg-gray-50">
          {previews.map((file, i) => (
            (file.has_thumbnail) ? (
              <Thumbnail key={file.path} className={`absolute w-56 h-56 flex-shrink-0 transform ${((previews.length - 1 - i) % 2 === 0) ? '-' : ''}rotate-${(previews.length - 1 - i) * 6} filter drop-shadow-xl`} size="lg" file={file} />
            ) : (
              <FileIcon key={file.path} className={`absolute w-56 h-56 flex-shrink-0 transform ${((previews.length - 1 - i) % 2 === 0) ? '-' : ''}rotate-${(previews.length - 1 - i) * 6} filter drop-shadow-xl`} mediatype={file.mediatype} hidden={file.hidden} />
            )
          ))}
        </div>

        <div className="p-4 flex flex-row justify-center space-x-8">
          <FilePreviewActions id="123" path="123" />
        </div>

        <div className="p-2 text-gray-800">
          <p className="text-lg font-semibold break-words">
            {files.length}
            &nbsp;
            items
          </p>
          <p className="text-gray-600 text-xs">
            <span>
              {countByTypeText(files.length, folderCount)}
            </span>
            <span className="px-1">&bull;</span>
            <FileSize size={size} />
          </p>
        </div>
      </div>
    </>
  );
}

function FileBrowserPreview({ files }) {
  return (
    <div className="mr-4 mb-4 text-gray-800 bg-white rounded-lg border-4 border-transparent">

      {/* tweak to match height to the table header (offset to table body) */}
      <div className="text-xs px-8 py-2 mb-1">
        &#8203;
      </div>

      {(files.length === 1) ? (
        <SingleFilePreview file={files[0]} />
      ) : (
        <MultiFilePreview files={files} />
      )}

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
