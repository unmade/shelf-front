import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import { MediaType } from '../../constants';
import * as icons from '../../icons';

import NoPreview from '../../containers/NoPreview';

import CodePreview from './CodePreview';
import Header from './Header';
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

function FilePreview({ preview, downloads, download, preparePath }) {
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
          history.replace(preparePath(prevFile.path));
          break;
        case 39: // right arrow
          history.replace(preparePath(nextFile.path));
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
    history.replace(preparePath(prevFile.path));
  };
  const onClickRight = () => {
    history.replace(preparePath(nextFile.path));
  };

  return (
    <div className="fixed inset-0 bottom-0 z-10">
      <div className="flex h-full flex-col bg-white">
        <Header
          idx={index}
          total={total}
          name={name}
          onGoBack={() => history.goBack()}
          onPrev={onClickLeft}
          onNext={onClickRight}
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
  preparePath: PropTypes.func,
};

FilePreview.defaultProps = {
  preparePath: ({ path }) => path,
};

export default FilePreview;
