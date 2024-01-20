import React from 'react';

import { useTranslation } from 'react-i18next';

import { ThumbnailSize } from '../../../constants';
import { MEGABYTE } from '../../../filesize';
import { FileShape } from '../../../types';

import Thumbnail from '../../Thumbnail';

import NoPreview from './NoPreview';

const MAX_SIZE = 20 * MEGABYTE;

function isHiDPI() {
  return (
    (window.matchMedia &&
      (window.matchMedia(
        'only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)',
      ).matches ||
        window.matchMedia(
          'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)',
        ).matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio >= 2)
  );
}

function getSize({ width, height }) {
  let pixelSize = Math.max(width, height);
  if (isHiDPI()) {
    pixelSize *= 2;
  }
  if (pixelSize <= 72) {
    return ThumbnailSize.xs;
  }
  if (pixelSize <= 512) {
    return ThumbnailSize.lg;
  }
  return ThumbnailSize.xxl;
}

function ImagePreview({ file }) {
  const { t } = useTranslation(['filePreview']);

  if (file.size > MAX_SIZE) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  const size = getSize(window.screen);
  return <Thumbnail className="h-full w-full" file={file} size={size} />;
}

ImagePreview.propTypes = {
  file: FileShape.isRequired,
};

export default ImagePreview;
