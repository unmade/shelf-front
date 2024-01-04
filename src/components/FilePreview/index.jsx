import React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { useLocation, useNavigate } from 'react-router-dom';

import useFiles from './hooks/useFiles';

import Spinner from '../ui/Spinner';

import Header from './Header';
import Info from './Info';
import Carousel from './Carousel';

function FilePreview({ ids, selectById, loading }) {
  const [infoVisible, setInfoVisible] = React.useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { currentIndex, files, setPrevFile, setNextFile } = useFiles({ ids, selectById });
  const { prevFile, file, nextFile } = files;
  const total = ids.length;

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
          setPrevFile();
          break;
        case 39: // right arrow
          setNextFile();
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
  }, [navigate, setPrevFile, setNextFile]);

  if (file == null) {
    return null;
  }

  const { name } = file;

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
            onPrev={setPrevFile}
            onNext={setNextFile}
            onInfo={onInfo}
          />

          <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
            <div className="flex">
              <Carousel
                files={[prevFile, file, nextFile]}
                onSwipeLeft={setPrevFile}
                onSwipeRight={setNextFile}
              />
              {infoVisible && (
                <div className="sm:min-w-80 xl:min-w-96 hidden sm:block">
                  <Info
                    className="h-full border-t bg-white px-5 py-6 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-900/70"
                    fileId={file.id}
                    selectById={selectById}
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

FilePreview.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  selectById: PropTypes.func.isRequired,
};

export default FilePreview;
