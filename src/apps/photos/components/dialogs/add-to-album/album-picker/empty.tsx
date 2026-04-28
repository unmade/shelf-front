import { useTranslation } from 'react-i18next';

import { AlbumsIcon } from '@/icons';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

export function AddToAlbumEmpty() {
  const { t } = useTranslation('photos');

  return (
    <Empty className="h-full p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlbumsIcon />
        </EmptyMedia>
        <EmptyTitle>
          {t('photos:dialogs.addToAlbumDialog.empty.title', {
            defaultValue: 'No albums yet',
          })}
        </EmptyTitle>
        <EmptyDescription>
          {t('photos:dialogs.addToAlbumDialog.empty.description', {
            defaultValue: 'Create an album first, then choose it to add your selected items.',
          })}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
