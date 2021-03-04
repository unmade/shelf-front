import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

import FileLink from '../FileLink';
import FileIcon from '../FileIcon';

import ImagePreview from './ImagePreview';

const PREVIEW_MAP = {
  'image/jpeg': ImagePreview,
  'image/png': ImagePreview,
  'image/svg+xml': ImagePreview,
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

function FilePreview({ preview, downloads, download }) {
  const { index, total, files } = preview;
  const [prevFile, file, nextFile] = files;

  React.useEffect(() => {
    if (file && PREVIEW_MAP[file.mediatype] && !downloads[file.path]) {
      download(file.path);
    }
  }, [file, downloads, download]);

  if (!file) {
    return null;
  }

  const { name, path, mediatype, hidden } = file;
  const Preview = PREVIEW_MAP[mediatype];

  const original = downloads[path];

  return (
    <div className="z-10 fixed bottom-0 inset-0">
      <div className="h-full flex flex-col bg-white">

        <Header
          idx={index}
          total={total}
          name={name}
          prevName={prevFile.name}
          nextName={nextFile.name}
        />

        <div className="h-full bg-gray-300">
          {(Preview) ? (
            <Preview file={file} original={original} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileIcon className="w-32 h-auto drop-shadow" mediatype={mediatype} hidden={hidden} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// FilePreview.propTypes = {
//   preview: PropTypes.shape({
//     index: PropTypes.number.isRequired,
//     total: PropTypes.number.isRequired,
//     files: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         path: PropTypes.string.isRequired,
//         mediatype: PropTypes.string.isRequired,
//         hidden: PropTypes.bool.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
//   downloads: PropTypes.objectOf(
//     PropTypes.string.isRequired,
//   ).isRequired,
//   download: PropTypes.func.isRequired,
// };

export default FilePreview;
