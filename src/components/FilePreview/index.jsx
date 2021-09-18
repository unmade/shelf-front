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

function replace(history, path) {
  history.replace(routes.makeUrlFromPath({ path, asPreview: true }));
}

function Header({
  idx, total, name, prevPath, nextPath,
}) {
  return (
    <div className="px-4 py-3 flex flex-row items-center justify-between">
      <div className="sm:w-48 flex flex-row">
        <FileLink className="flex items-center" path={routes.parent(prevPath)}>
          <Button
            type="text"
            size="base"
            icon={<icons.ChevronLeftOutlined className="w-5 h-5" />}
          />
        </FileLink>
      </div>

      <div className="min-w-0 w-full px-4 sm:px-8">
        <p className="text-left sm:text-center text-sm sm:text-lg font-bold truncate">
          {name}
        </p>
      </div>

      <div className="min-w-max sm:w-48 text-gray-800 flex flex-row items-center justify-end space-x-2">
        <FileLink path={prevPath} preview replace>
          <Button type="text" size="base" icon={<icons.ArrowNarrowLeftOutlined className="w-5 h-5" />} />
        </FileLink>

        <div className="text-gray-700 text-sm">
          <span>{idx + 1}</span>
          <span> / </span>
          <span>{total}</span>
        </div>

        <FileLink path={nextPath} preview replace>
          <Button type="text" size="base" icon={<icons.ArrowNarrowRightOutlined className="w-5 h-5" />} />
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

function FilePreview({ preview, downloads, download }) {
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
      if (prevFile == null || nextFile == null) {
        return;
      }
      switch (keyCode) {
        case 37: // left arrow
          replace(history, prevFile.path);
          break;
        case 39: // right arrow
          replace(history, nextFile.path);
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
  }, [history, prevFile, nextFile]);

  if (file == null) {
    return null;
  }

  const { name, path, mediatype } = file;
  const original = downloads[path];
  const loading = hasPreview(file) && (original == null);
  const Preview = getPreview(mediatype);

  const onClickLeft = () => {
    replace(history, prevFile.path);
  };
  const onClickRight = () => {
    replace(history, nextFile.path);
  };

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
            <>
              <div
                className="hidden pointer-coarse:block absolute top-0 left-0 bg-gray-10 w-1/4 h-full"
                onClick={onClickLeft}
                aria-hidden
              />
              <Preview file={file} original={original} />
              <div
                className="hidden pointer-coarse:block absolute top-0 right-0 bg-gray-10 w-1/4 h-full"
                onClick={onClickRight}
                aria-hidden
              />
            </>
          )}
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
