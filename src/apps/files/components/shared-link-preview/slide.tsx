import { useTranslation } from 'react-i18next';

import { type SharedLinkFileSchema, useDownloadSharedLinkContentQuery } from '@/store/sharedLinks';

import { MediaType } from '@/constants';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import { CodePreview, NoPreview, PDFPreview } from '@/apps/files/components/previews';
import { guessThumbnailSize, Thumbnail } from '@/apps/files/components/thumbnail';

const CODE_MAX_SIZE = 1 * MEGABYTE;
const PDF_MAX_SIZE = 9 * MEGABYTE;

interface SlideProps {
  file: SharedLinkFileSchema;
  token: string;
}

function SharedCodeSlide({ file, token }: SlideProps) {
  const shouldSkip = file.size > CODE_MAX_SIZE;
  const { data, isLoading } = useDownloadSharedLinkContentQuery(
    { token, filename: file.name },
    { skip: shouldSkip, selectFromResult: ({ data, isLoading }) => ({ data, isLoading }) },
  );

  if (shouldSkip) {
    return <NoPreview file={file} />;
  }

  if (isLoading) {
    return <Spinner className="h-full" />;
  }

  return <CodePreview file={file} content={data?.content} />;
}

function SharedPDFSlide({ file, token }: SlideProps) {
  const { t } = useTranslation(['filePreview']);

  const shouldSkip = file.size > PDF_MAX_SIZE;
  const { data, isLoading } = useDownloadSharedLinkContentQuery(
    { token, filename: file.name },
    { skip: shouldSkip, selectFromResult: ({ data, isLoading }) => ({ data, isLoading }) },
  );

  if (shouldSkip) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (isLoading) {
    return <Spinner className="h-full" />;
  }

  return <PDFPreview content={data?.content} />;
}

function SharedImageSlide({ file }: { file: SharedLinkFileSchema }) {
  const { t } = useTranslation(['filePreview']);

  if (!file.thumbnail_url) {
    return <NoPreview file={file} reason={t('filePreview:previewNotAvailable')} />;
  }

  const size = guessThumbnailSize(window.screen);
  return <Thumbnail className="size-full" file={file} size={size} />;
}

export function SharedLinkSlide({ file, token }: SlideProps) {
  const { mediatype } = file;

  let content: React.ReactNode;
  if (MediaType.isImage(mediatype)) {
    content = <SharedImageSlide file={file} />;
  } else if (MediaType.isText(mediatype)) {
    content = <SharedCodeSlide file={file} token={token} />;
  } else if (MediaType.isPDF(mediatype)) {
    content = <SharedPDFSlide file={file} token={token} />;
  } else {
    content = <NoPreview file={file} />;
  }

  return <div className="h-full flex-col overflow-auto py-4">{content}</div>;
}
