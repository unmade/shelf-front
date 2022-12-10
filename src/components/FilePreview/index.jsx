import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import usePreviewSearchParam from '../../hooks/preview-search-param';
import { MediaType } from '../../constants';
import { FileShape } from '../../types';

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
function FilePreview({ pathToPreview, files }) {
  const [infoVisible, setInfoVisible] = React.useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const currentIndex = files.findIndex((file) => file.path.replace('Trash/', '') === pathToPreview);

  const file = files[currentIndex];
  const prevFile = currentIndex - 1 < 0 ? files[files.length - 1] : files[currentIndex - 1];
  const nextFile = currentIndex + 1 > files.length - 1 ? files[0] : files[currentIndex + 1];

  const prevFilePreview = usePreviewSearchParam(prevFile.path);
  const nextFilePreview = usePreviewSearchParam(nextFile.path);

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
      if (prevFile == null || nextFile == null) {
        return;
      }
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
  }, [navigate, prevFile, nextFile]);

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

  return (
    <div className="fixed inset-0 bottom-0 z-10">
      <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
        <Header
          idx={currentIndex}
          total={files.length}
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
    </div>
  );
}

FilePreview.propTypes = {
  pathToPreview: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(FileShape).isRequired,
};

export default FilePreview;
