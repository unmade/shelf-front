import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getSelectedFiles } from '../../store/reducers/files';

import { MediaType } from '../../constants';

import FilePreviewActions from '../../containers/FilePreviewActions';
import Thumbnail from '../../containers/Thumbnail';

import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import FileIcon from '../FileIcon';

function getFontSizeFromText(text) {
  if (text.length > 128) {
    return 'text-sm';
  }
  if (text.length > 64) {
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
  const fontSize = getFontSizeFromText(file.name);

  return (
    <>
      <div className="px-4 pb-2 flex flex-col">
        <div className="h-64 w-auto flex items-center justify-center rounded-xl bg-gray-50">
          {(file.has_thumbnail) ? (
            <Thumbnail className="w-64 h-64 flex-shrink-0" size="lg" file={file} />
          ) : (
            <FileIcon className="w-56 h-56 flex-shrink-0 filter drop-shadow" mediatype={file.mediatype} hidden={file.hidden} />
          )}
        </div>

        <div className="p-4 flex flex-row justify-center space-x-8">
          <FilePreviewActions id={file.id} path={file.path} />
        </div>

        <div className="p-2 text-gray-800">
          <p className={`${fontSize} font-semibold break-words`}>
            {file.name}
          </p>
          <p className="text-gray-600 text-xs">
            <FileSize size={file.size} />
            <span className="px-1">&bull;</span>
            <TimeAgo mtime={file.mtime * 1000} />
          </p>
        </div>
      </div>
    </>
  );
}

function Preview({ className, file }) {
  if (file.has_thumbnail) {
    return <Thumbnail className={className} size="lg" file={file} />;
  }
  return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
}

Preview.propTypes = {
  className: PropTypes.string,
};

Preview.defaultProps = {
  className: '',
};

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
            <Preview
              key={file.id}
              className={`absolute w-56 h-56 filter drop-shadow-xl transform ${((previews.length - 1 - i) % 2 === 0) ? '-' : ''}rotate-${(previews.length - 1 - i) * 6}`}
              file={file}
            />
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

function SidePreview() {
  const files = useSelector(getSelectedFiles);
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

SidePreview.propTypes = {};

export default SidePreview;