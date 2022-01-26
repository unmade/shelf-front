import React from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';

import FileIcon from '../FileIcon';

function ImagePreview({ file, original }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const imgHeight = height - 40;
        return (
          <div style={{ height, width }} className="flex items-center justify-center">
            {original ? (
              <img src={original} style={{ maxHeight: imgHeight }} alt={file.name} />
            ) : (
              <FileIcon className="h-48 w-48" mediatype={file.mediatype} hidden={file.hidden} />
            )}
          </div>
        );
      }}
    </AutoSizer>
  );
}

ImagePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImagePreview;
