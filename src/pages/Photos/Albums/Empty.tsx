import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';

import { useCreateAlbumDialog } from '@/apps/photos/components/dialogs';

export default function EmptyContainer() {
  const { t } = useTranslation('photos');

  const { openDialog } = useCreateAlbumDialog();

  const title = t('photos:pages.albums.welcomeTitle', {
    defaultValue: 'Start Your Collection',
  });

  const description = t('photos:pages.albums.welcomeDescription', {
    defaultValue: 'Create your first album and bring your memories to life',
  });

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={openDialog}>
          {t('photos:pages.albums.newAlbumButton', { defaultValue: 'Create Album' })}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
