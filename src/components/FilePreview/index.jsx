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

function Header({ idx, total, name, prevPath, nextPath }) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <FileLink className="flex items-center" path={routes.parent(prevPath)}>
          <Button
            type="text"
            size="base"
            icon={<icons.ChevronLeftOutlined className="h-5 w-5" />}
          />
        </FileLink>
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8">
        <p className="truncate text-left text-sm font-bold sm:text-center sm:text-lg">{name}</p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 sm:w-48">
        <FileLink path={prevPath} preview replace>
          <Button
            type="text"
            size="base"
            icon={<icons.ArrowNarrowLeftOutlined className="h-5 w-5" />}
          />
        </FileLink>

        <div className="text-sm text-gray-700">
          <span>{idx + 1}</span>
          <span> / </span>
          <span>{total}</span>
        </div>

        <FileLink path={nextPath} preview replace>
          <Button
            type="text"
            size="base"
            icon={<icons.ArrowNarrowRightOutlined className="h-5 w-5" />}
          />
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

  React.useEffect(() => () => {
    if (history.action === 'POP') {
      const { pathname, search } = history.location;
      if (pathname !== location.pathname && search !== location.search) {
        history.goBack();
      }
    }
  });

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
  const loading = hasPreview(file) && original == null;
  const Preview = getPreview(mediatype);

  const onClickLeft = () => {
    replace(history, prevFile.path);
  };
  const onClickRight = () => {
    replace(history, nextFile.path);
  };

  return (
    <div className="fixed inset-0 bottom-0 z-10">
      <div className="flex h-full flex-col bg-white">
        <Header
          idx={index}
          total={total}
          name={name}
          prevPath={prevFile.path}
          nextPath={nextFile.path}
        />

        <div className="h-full overflow-scroll bg-gray-200">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <icons.Spinner className="h-8 w-8 animate-spin text-gray-600" />
            </div>
          ) : (
            <>
              <div
                className="bg-gray-10 absolute top-0 left-0 hidden h-full w-1/4 pointer-coarse:block"
                onClick={onClickLeft}
                aria-hidden
              />
              <Preview file={file} original={original} />
              <div
                className="bg-gray-10 absolute top-0 right-0 hidden h-full w-1/4 pointer-coarse:block"
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
      })
    ).isRequired,
  }).isRequired,
  downloads: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  download: PropTypes.func.isRequired,
};

export default FilePreview;
