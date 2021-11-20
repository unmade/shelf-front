import React from 'react';
import PropTypes from 'prop-types';

import { shallowEqual, useSelector } from 'react-redux';

import { getFilesByIds } from '../../store/reducers/files';
import { getSelectedFileIds } from '../../store/reducers/ui';

import { MediaType } from '../../constants';
import pluralize from '../../pluralize';

import Button from '../ui/Button';
import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import BookmarkButton from '../BookmarkButton';
import FileLink from '../FileLink';
import Thumbnail from '../Thumbnail';

import SidePreviewActions from './SidePreviewActions';

function getFontSizeFromText(text) {
  if (text.length > 128) {
    return 'text-sm';
  }
  if (text.length > 64) {
    return 'text-md';
  }
  return 'text-lg';
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
        <div className="h-72 w-auto flex items-center justify-center rounded-xl bg-gray-50">
          <Thumbnail className="w-64 h-64 flex-shrink-0" size="lg" fileId={file.id} />
        </div>

        <div className="pl-2 py-2 flex items-center justify-between">
          <div className="min-w-0 text-gray-800">
            <p className={`${fontSize} font-semibold break-words`}>
              {file.name}
            </p>
            <p className="text-gray-600 text-xs">
              <FileSize size={file.size} />
              <span className="px-1">&bull;</span>
              <TimeAgo mtime={file.mtime * 1000} />
            </p>
          </div>
          <BookmarkButton
            fileId={file.id}
            className="hover:bg-orange-50"
            size="lg"
          />
        </div>

        <div className="pl-2 pr-0.5 py-2 flex items-center justify-between">
          <div>
            <Button
              type="primary"
              size="xs"
            >
              <FileLink
                path={file.path}
                preview={file.mediatype !== MediaType.FOLDER}
              >
                Open
              </FileLink>
            </Button>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <SidePreviewActions files={[file]} />
          </div>
        </div>

        <div className="mt-2 p-2">
          <h3 className="font-semibold text-base">
            Information
          </h3>
          <div className="text-xs font-medium divide-y">
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Size
              </p>
              <p>
                <FileSize size={file.size} />
              </p>
            </div>
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Created
              </p>
              <p>
                <TimeAgo mtime={file.mtime * 1000} format="LLL" />
              </p>
            </div>
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Modified
              </p>
              <p>
                <TimeAgo mtime={file.mtime * 1000} format="LLL" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SingleFilePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mtime: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

const rotations = {
  0: 'rotate-6',
  1: '-rotate-6',
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

  const minMtime = files.reduce((prev, curr) => (
    prev.mtime < curr.mtime ? prev : curr
  ), 0);
  const maxMtime = files.reduce((prev, curr) => (
    prev.mtime > curr.mtime ? prev : curr
  ), 0);

  return (
    <>
      <div className="px-4 pb-2 flex flex-col">
        <div className="h-72 w-auto flex items-center justify-center rounded-xl bg-gray-50">
          {previews.map((file, i) => (
            <span
              key={file.id}
              className={`absolute drop-shadow-xl transform ${(i === previews.length - 1) ? 'rotate-0' : rotations[i]}`}
            >
              <Thumbnail
                className="w-56 h-56"
                size="lg"
                fileId={file.id}
              />
            </span>
          ))}
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

        <div className="pl-2 pr-1 py-2 flex items-center justify-between">
          <div>
            <Button
              type="primary"
              size="xs"
            >
              Download
            </Button>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <SidePreviewActions files={files} />
          </div>
        </div>

        <div className="mt-2 p-2">
          <h3 className="font-semibold text-base">
            Information
          </h3>
          <div className="text-xs font-medium divide-y">
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Size
              </p>
              <p>
                <FileSize size={size} />
              </p>
            </div>
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Created
              </p>
              <p>
                <TimeAgo mtime={minMtime.mtime * 1000} format="ll" />
                &nbsp;-&nbsp;
                <TimeAgo mtime={maxMtime.mtime * 1000} format="ll" />
              </p>
            </div>
            <div className="py-2 flex justify-between">
              <p className="text-gray-500">
                Modified
              </p>
              <p>
                <TimeAgo mtime={minMtime.mtime * 1000} format="ll" />
                &nbsp;-&nbsp;
                <TimeAgo mtime={maxMtime.mtime * 1000} format="ll" />
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

MultiFilePreview.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mediatype: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

function SidePreview() {
  const selectedIds = useSelector(getSelectedFileIds);
  const files = useSelector((state) => getFilesByIds(state, { ids: selectedIds }), shallowEqual);
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
