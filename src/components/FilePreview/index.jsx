import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import { MediaType } from '../../constants';

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

function FilePreview({ preview, preparePath }) {
  const [infoVisible, setInfoVisible] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { index, total, files } = preview;
  const [prevFile, file, nextFile] = files;

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
          navigate(preparePath(prevFile.path), { replace: true });
          break;
        case 39: // right arrow
          navigate(preparePath(nextFile.path), { replace: true });
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
    navigate(preparePath(prevFile.path), { replace: true });
  };

  const onClickRight = () => {
    navigate(preparePath(nextFile.path), { replace: true });
  };

  const onGoBack = () => {
    navigate(-1);
  };

  const onInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="fixed inset-0 bottom-0 z-10">
      <div className="flex h-full flex-col bg-white">
        <Header
          idx={index}
          total={total}
          name={name}
          onGoBack={onGoBack}
          onPrev={onClickLeft}
          onNext={onClickRight}
          onInfo={onInfo}
        />

        <div className="h-full overflow-scroll bg-gray-200">
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
                <Info className="h-full border-t bg-white px-5 py-6 shadow" fileId={file.id} />
              </div>
            )}
          </div>
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
  preparePath: PropTypes.func,
};

FilePreview.defaultProps = {
  preparePath: ({ path }) => path,
};

export default FilePreview;
