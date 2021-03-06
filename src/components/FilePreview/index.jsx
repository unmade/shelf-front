import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { MediaType } from '../../constants';
import * as icons from '../../icons';
import * as routes from '../../routes';

import NoPreview from '../../containers/NoPreview';

import FileLink from '../FileLink';

import CodePreview from './CodePreview';
import ImagePreview from './ImagePreview';

const MAX_PREVIEW_SIZE_BY_TYPE = {
  application: 1048576, // 1 MB
  text: 1048576, // 1 MB
  image: 20971520, // 20 MB
};

function getPreview(mediatype) {
  if (MediaType.isImage(mediatype)) {
    return ImagePreview;
  }
  if (MediaType.isText(mediatype)) {
    return CodePreview;
  }
  return NoPreview;
}

function hasPreview({ size, mediatype }) {
  const type = mediatype.split('/')[0];
  return size < MAX_PREVIEW_SIZE_BY_TYPE[type] && getPreview(mediatype) !== null;
}

function Header({
  idx, total, name, prevName, nextName,
}) {
  return (
    <div className="px-4 py-2 flex flex-row items-center justify-between">
      <div className="w-48 flex flex-row">
        <div className="p-1 rounded-md hover:bg-gray-100">
          <FileLink>
            <icons.ChevronLeft />
          </FileLink>
        </div>
      </div>

      <div className="min-w-0 px-8">
        <p className="text-l font-bold truncate">
          {name}
        </p>
      </div>

      <div className="w-48 text-gray-800 flex flex-row items-center justify-end space-x-2">
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

function FilePreview({ dirPath, preview, downloads, download }) {
  const history = useHistory();
  const { index, total, files } = preview;
  const [prevFile, file, nextFile] = files;

  React.useEffect(() => {
    if (file && hasPreview(file) && !downloads[file.path]) {
      download(file.path);
    }
  }, [file, downloads, download]);

  React.useEffect(() => {
    const onKeyUp = ({ keyCode }) => {
      switch (keyCode) {
        case 37: // left arrow
          history.push(routes.FILES.preview(prevFile));
          break;
        case 39: // right arrow
          history.push(routes.FILES.preview(nextFile));
          break;
        case 27: // escape
          history.push(routes.FILES.reverse({ path: dirPath }));
          break;
        default:
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [history, dirPath, prevFile, nextFile]);

  if (file === null || file === undefined) {
    return null;
  }

  const { name, path, mediatype } = file;
  const original = downloads[path];
  const Preview = getPreview(mediatype);

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

        <div className="overflow-scroll h-full bg-gray-300">
          <Preview file={file} original={original} />
        </div>

      </div>
    </div>
  );
}

FilePreview.propTypes = {
  preview: PropTypes.shape({
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        mediatype: PropTypes.string.isRequired,
        hidden: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  downloads: PropTypes.objectOf(
    PropTypes.string.isRequired,
  ).isRequired,
  download: PropTypes.func.isRequired,
};

export default FilePreview;
