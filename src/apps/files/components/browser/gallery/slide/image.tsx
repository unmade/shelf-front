import { useTranslation } from 'react-i18next';

import { selectFeatureMaxFileSizeToThumbnail } from '@/store/features';
import type { FileSchema } from '@/store/files';

import { useAppSelector } from '@/hooks';

import { NoPreview } from '@/apps/files/components/previews';
import { guessThumbnailSize, Thumbnail } from '@/apps/files/components/thumbnail';

interface Props {
  file: FileSchema;
}

export function ImageSlide({ file }: Props) {
  const { t } = useTranslation('files');
  const maxSize = useAppSelector(selectFeatureMaxFileSizeToThumbnail);

  if (file.size > maxSize) {
    return (
      <NoPreview
        file={file}
        reason={t('preview.fileTooLarge', { defaultValue: 'File is too large to preview' })}
      />
    );
  }

  const size = guessThumbnailSize(window.screen);
  return <Thumbnail className="size-full" file={file} size={size} />;
}
