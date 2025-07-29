import { useTranslation } from 'react-i18next';

import type { IFile } from 'types/files';

import { useAppSelector } from 'hooks';

import { selectFeatureMaxFileSizeToThumbnail } from 'store/features';

import Thumbnail, { ThumbnailSize } from 'components/Thumbnail';

import NoPreview from './NoPreview';

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

function getSize({ width, height }: { width: number; height: number }): string {
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

interface Props {
  file: IFile;
}

export default function ImagePreview({ file }: Props) {
  const { t } = useTranslation(['filePreview']);
  const maxSize = useAppSelector(selectFeatureMaxFileSizeToThumbnail);

  if (file.size > maxSize) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  const size = getSize(window.screen);
  return <Thumbnail className="h-full w-full" file={file} size={size} />;
}
