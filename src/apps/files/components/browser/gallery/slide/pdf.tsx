import { useTranslation } from 'react-i18next';

import { type FileSchema, useDownloadContentQuery } from '@/store/files';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import { NoPreview } from './no-preview';

const MAX_SIZE = 9 * MEGABYTE;

interface Props {
  file: FileSchema;
}

export function PDFSlide({ file }: Props) {
  const { t } = useTranslation(['filePreview']);

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, { skip: shouldSkip });

  if (shouldSkip) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (loading) {
    return <Spinner className="h-full" />;
  }

  return (
    <object
      data={data?.content}
      type="application/pdf"
      width="100%"
      height="100%"
      aria-label="PDF Preview"
    />
  );
}
