import { useTranslation } from 'react-i18next';

import { type FileSchema, useDownloadContentQuery } from '@/store/files';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import { NoPreview, PDFPreview } from '@/apps/files/components/previews';

const MAX_SIZE = 9 * MEGABYTE;

interface PDFSlideProps {
  file: FileSchema;
}

export function PDFSlide({ file }: PDFSlideProps) {
  const { t } = useTranslation(['filePreview']);

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, {
    skip: shouldSkip,
    selectFromResult: ({ data, isLoading }) => ({ data, isLoading }),
  });

  if (shouldSkip) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (loading) {
    return <Spinner className="h-full" />;
  }

  return <PDFPreview content={data?.content} />;
}
