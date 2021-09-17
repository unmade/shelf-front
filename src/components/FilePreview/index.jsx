import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import { MediaType } from '../../constants';
import * as icons from '../../icons';
import * as routes from '../../routes';

import NoPreview from '../../containers/NoPreview';

import Button from '../ui/Button';

import CodePreview from './CodePreview';
import FileLink from '../FileLink';
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
  return size < MAX_PREVIEW_SIZE_BY_TYPE[type] && getPreview(mediatype) !== NoPreview;
}

function Header({
  idx, total, name, prevPath, nextPath,
}) {
  return (
    <div className="p-4 flex flex-row items-center justify-between">
      <div className="sm:w-48 flex flex-row">
        <FileLink path={routes.parent(prevPath)}>
          <Button type="text" size="base" icon={<icons.ChevronLeft />} />
        </FileLink>
      </div>

      <div className="min-w-0 w-full px-4 sm:px-8">
        <p className="text-left sm:text-center text-sm sm:text-lg font-bold truncate">
          {name}
        </p>
      </div>

      <div className="min-w-max sm:w-48 text-gray-800 flex flex-row items-center justify-end space-x-2">
        <FileLink path={prevPath} preview replace>
          <Button type="text" size="base" icon={<icons.ArrowNarrowLeft />} />
        </FileLink>

        <div className="text-gray-700 text-sm">
          <span>{idx + 1}</span>
          <span> / </span>
          <span>{total}</span>
        </div>

        <FileLink path={nextPath} preview replace>
          <Button type="text" size="base" icon={<icons.ArrowNarrowRight />} />
        </FileLink>
      </div>
    </div>
  );
}

Header.propTypes = {
  idx: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  prevPath: PropTypes.string.isRequired,
  nextPath: PropTypes.string.isRequired,
};

function FilePreview({ dirPath, preview, downloads, download }) {
  const history = useHistory();
  const location = useLocation();
  const { index, total, files } = preview;
  const [prevFile, file, nextFile] = files;

  React.useEffect(() => {
    if (file && hasPreview(file) && !downloads[file.path]) {
      download(file.path);
    }
  }, [file, downloads, download]);

  React.useEffect(() => (
    () => {
      if (history.action === 'POP') {
        const { pathname, search } = history.location;
        if (pathname !== location.pathname && search !== location.search) {
          history.goBack();
        }
      }
    }
  ));

  React.useEffect(() => {
    const onKeyUp = ({ keyCode }) => {
      switch (keyCode) {
        case 37: // left arrow
          history.replace(routes.makeUrlFromPath({ path: prevFile.path, asPreview: true }));
          break;
        case 39: // right arrow
          history.replace(routes.makeUrlFromPath({ path: nextFile.path, asPreview: true }));
          break;
        case 27: // escape
          history.goBack();
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
  const loading = hasPreview(file) && (original == null);
  const Preview = getPreview(mediatype);

  return (
    <div className="z-10 fixed bottom-0 inset-0">
      <div className="h-full flex flex-col bg-white">

        <Header
          idx={index}
          total={total}
          name={name}
          prevPath={prevFile.path}
          nextPath={nextFile.path}
        />

        <div className="overflow-scroll h-full bg-gray-200">
          {(loading) ? (
            <div className="h-full flex items-center justify-center">
              <icons.Spinner className="w-8 h-8 text-gray-600 animate-spin" />
            </div>
          ) : (
            <Preview file={file} original={original} />
          )}
        </div>

      </div>
    </div>
  );
}

FilePreview.propTypes = {
  dirPath: PropTypes.string.isRequired,
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
