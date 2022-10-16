import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail';

function isHiDPI() {
  return (
    (window.matchMedia &&
      (window.matchMedia(
        'only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)'
      ).matches ||
        window.matchMedia(
          'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)'
        ).matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio >= 2)
  );
}

function getSize({ width, height }) {
  let pixelSize = Math.max(width, height);
  if (isHiDPI()) {
    pixelSize *= 2;
  }
  if (pixelSize <= 64) {
    return 'xs';
  }
  if (pixelSize <= 128) {
    return 'sm';
  }
  if (pixelSize <= 256) {
    return 'md';
  }
  if (pixelSize <= 512) {
    return 'lg';
  }
  if (pixelSize <= 1024) {
    return 'xl';
  }
  if (pixelSize <= 2048) {
    return '2xl';
  }
  return '3xl';
}

function ImagePreview({ file }) {
  const size = getSize(window.screen);
  return <Thumbnail className="h-full w-full" fileId={file.id} size={size} />;
}

ImagePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImagePreview;
