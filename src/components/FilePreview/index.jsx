import React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

import usePreviewSearchParam from '../../hooks/preview-search-param';
import useResolvedPreviewSearchParam from '../../hooks/resolved-preview-search-param';

import { MediaType } from '../../constants';
import { FileShape } from '../../types';

import Spinner from '../ui/Spinner';

import CodePreview from './Previews/CodePreview';
import ImagePreview from './Previews/ImagePreview';
import NoPreview from './Previews/NoPreview';
import PDFPreview from './Previews/PDFPreview';

import Header from './Header';
import Info from './Info';

const height = {
  height: `calc(100vh - 60px)`,
};

function getPreview(mediatype) {
  if (MediaType.isImage(mediatype)) {
    return ImagePreview;
  }
  if (MediaType.isText(mediatype)) {
    return CodePreview;
  }
  if (MediaType.isPDF(mediatype)) {
    return PDFPreview;
  }
  return NoPreview;
}

function FilePreviewComponent({ currentIndex, file, loading, nextPath, prevPath, total }) {
  const [infoVisible, setInfoVisible] = React.useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const prevFilePreview = usePreviewSearchParam(prevPath ?? '');
  const nextFilePreview = usePreviewSearchParam(nextPath ?? '');

  React.useEffect(() => () => {
    if (navigate.action === 'POP') {
      const { pathname, search } = navigate.location;
      if (pathname !== location.pathname && search !== location.search) {
        navigate(-1);
      }
    }
  });

  React.useEffect(() => {
    const onKeyUp = ({ keyCode }) => {
      switch (keyCode) {
        case 37: // left arrow
          setSearchParams(prevFilePreview, { replace: true });
          break;
        case 39: // right arrow
          setSearchParams(nextFilePreview, { replace: true });
          break;
        case 27: // escape
          navigate(-1);
          break;
        default:
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [navigate, prevFilePreview, nextFilePreview]);

  if (file == null) {
    return null;
  }

  const { name, mediatype } = file;
  const Preview = getPreview(mediatype);

  const onClickLeft = () => {
    setSearchParams(prevFilePreview, { replace: true });
  };

  const onClickRight = () => {
    setSearchParams(nextFilePreview, { replace: true });
  };

  const onGoBack = () => {
    navigate(-1);
  };

  const onInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return createPortal(
    <div className="fixed inset-0 bottom-0 dark:bg-zinc-900 dark:text-zinc-200">
      {loading ? (
        <Spinner className="h-full w-full" />
      ) : (
        <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
          <Header
            idx={currentIndex}
            total={total}
            name={name}
            onGoBack={onGoBack}
            onPrev={onClickLeft}
            onNext={onClickRight}
            onInfo={onInfo}
          />

          <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
            <div className="flex">
              <div
                style={height}
                className={`overflow-scroll p-4 ${
                  infoVisible ? 'w-full sm:w-2/3 xl:w-3/4' : 'w-full'
                }`}
              >
                {file != null && <Preview file={file} />}
              </div>
              {infoVisible && (
                <div className="hidden sm:block sm:w-1/3 xl:w-1/4">
                  <Info
                    className="h-full border-t bg-white px-5 py-6 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-900/70"
                    file={file}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

FilePreviewComponent.propTypes = {
  file: FileShape,
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  currentIndex: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

FilePreviewComponent.defaultProps = {
  loading: false,
};

function FilePreview({ ids, loading, selectById }) {
  const pathToPreview = useResolvedPreviewSearchParam();

  const paths = useSelector((state) => ids.map((id) => selectById(state, id).path), shallowEqual);

  let currentIndex = 0;
  let prevIndex = 0;
  let nextIndex = 0;
  if (paths.length) {
    currentIndex = paths.findIndex((path) => path.replace('Trash/', '') === pathToPreview);
    prevIndex = currentIndex - 1 < 0 ? ids.length - 1 : currentIndex - 1;
    nextIndex = currentIndex + 1 > ids.length - 1 ? 0 : currentIndex + 1;
  }

  const file = useSelector((state) => selectById(state, ids[currentIndex]));
  const prevFilePath = useSelector((state) => selectById(state, ids[prevIndex])?.path);
  const nextFilePath = useSelector((state) => selectById(state, ids[nextIndex])?.path);

  return (
    <FilePreviewComponent
      file={file}
      prevPath={prevFilePath}
      nextPath={nextFilePath}
      currentIndex={currentIndex}
      total={ids.length}
      loading={loading}
    />
  );
}

FilePreview.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  selectById: PropTypes.func.isRequired,
};

export default FilePreview;
