import React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { MediaType } from '../../../constants';
import { SharedLinkFileShape } from '../../../types';

import Spinner from '../../../components/ui/Spinner';

import Header from './Header';
import Info from './Info';

import CodePreview from './Previews/CodePreview';
import ImagePreview from './Previews/ImagePreview';
import NoPreview from './Previews/NoPreview';
import PDFPreview from './Previews/PDFPreview';

const height = {
  height: `calc(100vh - 65px)`,
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

function SharedLinkFilePreview({ file, loading, token }) {
  const [infoVisible, setInfoVisible] = React.useState(true);
  if (file == null) {
    return null;
  }

  const { name, mediatype } = file;
  const Preview = getPreview(mediatype);

  const onInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return createPortal(
    <div className="fixed inset-0 bottom-0 dark:bg-zinc-900 dark:text-zinc-200">
      {loading ? (
        <Spinner className="h-full w-full" />
      ) : (
        <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
          <Header name={name} onInfo={onInfo} />

          <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
            <div className="flex">
              <div
                style={height}
                className={`overflow-scroll p-4 ${
                  infoVisible ? 'w-full sm:w-2/3 xl:w-3/4' : 'w-full'
                }`}
              >
                {file != null && <Preview token={token} file={file} />}
              </div>
              {infoVisible && (
                <div className="hidden sm:block sm:w-1/3 xl:w-1/4">
                  <Info
                    className="h-full bg-white px-5 py-6 shadow dark:border-zinc-700/50 dark:bg-zinc-800 dark:shadow-zinc-900/70"
                    file={file}
                    token={token}
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

SharedLinkFilePreview.propTypes = {
  file: SharedLinkFileShape,
  loading: PropTypes.bool,
  token: PropTypes.string.isRequired,
};

SharedLinkFilePreview.defaultProps = {
  loading: false,
};

export default SharedLinkFilePreview;
