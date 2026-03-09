import { useTranslation } from 'react-i18next';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

import FileIcon from '@/components/FileIcon';

export interface PreviewFile {
  name: string;
  mediatype: string;
  hidden: boolean;
}

interface Props {
  file: PreviewFile;
  reason?: string;
}

export function NoPreview({ file, reason }: Props) {
  const { t } = useTranslation('files');

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
        <EmptyDescription>
          {reason ?? t('preview.notAvailable', { defaultValue: 'Preview is not available' })}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
