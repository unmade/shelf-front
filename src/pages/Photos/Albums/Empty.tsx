import { useTranslation } from 'react-i18next';

import Button from 'components/ui-legacy/Button';

import Empty from 'components/photos/Empty';
import { useCreateAlbumDialog } from 'components/photos/CreateAlbumDialogProvider';

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
    <Empty
      title={title}
      description={
        <>
          <p>{description}</p>
          <div className="mt-8 lg:mt-3">
            <Button variant="primary" size="lg" onClick={openDialog}>
              {t('photos:pages.albums.newAlbumButton', { defaultValue: 'Create Album' })}
            </Button>
          </div>
        </>
      }
    />
  );
}
