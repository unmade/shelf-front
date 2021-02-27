import React from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

import * as icons from '../../icons';

import FileLink from '../FileLink';
import FileIcon from '../FileIcon';

import ImagePreview from './ImagePreview';

const PREVIEW_MAP = {
  'image/jpeg': ImagePreview,
  'image/png': ImagePreview,
};

function Header({
  idx, total, name, prevName, nextName,
}) {
  return (
    <div className="px-4 py-2 flex flex-row items-center justify-between">
      <div className="w-32 flex flex-row">
        <div className="p-1 rounded-md hover:bg-gray-100">
          <FileLink>
            <icons.ChevronLeft />
          </FileLink>
        </div>
      </div>

      <div>
        <p className="text-l font-bold">
          {name}
        </p>
      </div>

      <div className="w-32 text-gray-800 flex flex-row items-center space-x-2">
        <span className="p-1 rounded-md hover:bg-gray-100">
          <FileLink name={prevName} preview>
            <icons.ArrowLeft />
          </FileLink>
        </span>

        <div className="text-gray-700 text-sm">
          <span>{idx + 1}</span>
          <span> / </span>
          <span>{total}</span>
        </div>

        <span className="p-1 rounded-md hover:bg-gray-100">
          <FileLink name={nextName} preview>
            <icons.ArrowRight />
          </FileLink>
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {
  idx: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  prevName: PropTypes.string.isRequired,
  nextName: PropTypes.string.isRequired,
};

function FilePreview({ files }) {
  const location = useLocation();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  if (preview === null || preview === undefined || preview === '') {
    return null;
  }

  let fileIdx = null;
  const file = files.filter((f, idx) => {
    if (f.name === preview) {
      fileIdx = idx;
      return true;
    }
    return false;
  })[0];

  if (fileIdx === null || fileIdx === undefined) {
    return null;
  }

  let prevFileIdx = fileIdx - 1;
  if (prevFileIdx < 0) {
    prevFileIdx = files.length - 1;
  }

  let nextFileIdx = fileIdx + 1;
  if (nextFileIdx > files.length - 1) {
    nextFileIdx = 0;
  }

  const { name, mediatype } = file;
  const Preview = PREVIEW_MAP[mediatype];

  return (
    <div className="z-10 fixed bottom-0 inset-0">
      <div className="h-full flex flex-col bg-white">

        <Header
          idx={fileIdx}
          total={files.length}
          name={name}
          prevName={files[prevFileIdx].name}
          nextName={files[nextFileIdx].name}
        />

        <div className="h-full bg-gray-300">
          {(Preview) ? (
            <Preview file={file} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileIcon className="w-32 h-auto drop-shadow" mediatype={file.mediatype} hidden={file.hidden} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

FilePreview.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      mediatype: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default FilePreview;
