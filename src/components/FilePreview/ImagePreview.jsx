import React from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';

function ImagePreview({ file }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const imgHeight = height - 40;
        return (
          <div style={{ height, width }} className="flex items-center justify-center">
            <img
              className="p-4"
              srcSet={`${file.thumbnail}?size=${imgHeight} 1x, ${file.thumbnail}?size=${2 * imgHeight} 2x`}
              style={{ height: `${imgHeight}px` }}
              alt="preview"
            />
          </div>
        );
      }}
    </AutoSizer>
  );
}

ImagePreview.propTypes = {
  file: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImagePreview;
