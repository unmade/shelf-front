import { useTranslation } from 'react-i18next';

import { selectFeatureMaxFileSizeToThumbnail } from '@/store/features';
import type { FileSchema } from '@/store/files';

import { useAppSelector } from '@/hooks';

import FileIcon from '@/components/FileIcon';
import {
  Thumbnail,
  ThumbnailFallback,
  ThumbnailImage,
  guessThumbnailSize,
} from '@/components/thumbnail';

import { NoPreview } from '@/apps/files/components/previews';

interface Props {
  file: FileSchema;
}

export function ImageSlide({ file }: Props) {
  const { t } = useTranslation('files');
  const maxSize = useAppSelector(selectFeatureMaxFileSizeToThumbnail);
  const size = guessThumbnailSize(window.screen);

  if (file.size > maxSize) {
    return (
      <NoPreview
        file={file}
        reason={t('preview.fileTooLarge', { defaultValue: 'File is too large to preview' })}
      />
    );
  }

  return (
    <Thumbnail className="size-full">
      <ThumbnailImage src={file.thumbnail_url} size={size} alt={file.name} />
      <ThumbnailFallback>
        <FileIcon className="size-14" mediatype={file.mediatype} hidden={file.hidden} />
      </ThumbnailFallback>
    </Thumbnail>
  );
}
