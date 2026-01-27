import { useTranslation } from 'react-i18next';

import { FolderIcon } from 'lucide-react';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

interface FileBrowserEmptyProps {
  title?: string;
  description?: string;
}

export function FileBrowserEmpty({ title, description }: FileBrowserEmptyProps) {
  const { t } = useTranslation();

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>{title ?? t('This folder is empty')}</EmptyTitle>
        <EmptyDescription>
          {description ?? t('Upload files or create a new folder to get started.')}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
