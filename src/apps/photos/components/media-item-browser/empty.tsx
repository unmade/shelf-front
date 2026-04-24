import { useTranslation } from 'react-i18next';

import { ImageIcon } from '@/icons';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

interface MediaItemBrowserEmptyProps {
  title?: string;
  description?: string;
}

export function MediaItemBrowserEmpty({ title, description }: MediaItemBrowserEmptyProps) {
  const { t } = useTranslation('photos');

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>
          {title ?? t('browser.empty.title', { defaultValue: 'No photos yet' })}
        </EmptyTitle>
        <EmptyDescription>
          {description ??
            t('browser.empty.description', {
              defaultValue: 'Upload photos to start building your library.',
            })}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
