import { useTranslation } from 'react-i18next';

import { type FileSchema } from '@/store/files';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

import FileIcon from '@/components/FileIcon';

interface Props {
  file: FileSchema;
  reason?: string;
}

export function NoPreview({ file, reason }: Props) {
  const { t } = useTranslation(['translation', 'filePreview']);

  const { name, mediatype, hidden } = file;

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileIcon
            className="mx-auto h-auto w-32 drop-shadow-lg"
            mediatype={mediatype}
            hidden={hidden}
          />
        </EmptyMedia>
        <EmptyTitle>{name}</EmptyTitle>
        <EmptyDescription>{reason ?? t('filePreview:previewNotAvailable')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
