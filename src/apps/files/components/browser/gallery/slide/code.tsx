import { type FileSchema, useDownloadContentQuery } from '@/store/files';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import { CodePreview, NoPreview } from '@/apps/files/components/previews';

const MAX_SIZE = 1 * MEGABYTE;

interface CodeSlideProps {
  file: FileSchema;
}

export function CodeSlide({ file }: CodeSlideProps) {
  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, {
    skip: shouldSkip,
    selectFromResult: ({ data, isLoading }) => ({ data, isLoading }),
  });

  if (shouldSkip) {
    return <NoPreview file={file} />;
  }

  if (loading) {
    return <Spinner className="h-full" />;
  }

  return <CodePreview file={file} content={data?.content} />;
}
