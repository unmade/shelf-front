import React from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';

import FileIcon from '../FileIcon';

function ImagePreview({ file }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <div style={{ height, width }} className="flex items-center justify-center">
            <FileIcon className="w-48 h-48" mediatype={file.mediatype} hidden={file.hidden} />
          </div>
        );
      }}
    </AutoSizer>
  );
}

ImagePreview.propTypes = {
  file: PropTypes.shape({
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImagePreview;
