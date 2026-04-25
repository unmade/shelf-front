import { useTranslation } from 'react-i18next';

import { AlbumsIcon } from '@/icons';

import { Button } from '@/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/ui/empty';

import { useCreateAlbumDialog } from '@/components/photos/CreateAlbumDialogProvider';

interface AlbumsBrowserEmptyProps {
  title?: string;
  description?: string;
  showAction?: boolean;
}

export function AlbumsBrowserEmpty({
  title,
  description,
  showAction = true,
}: AlbumsBrowserEmptyProps) {
  const { t } = useTranslation('photos');
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlbumsIcon />
        </EmptyMedia>
        <EmptyTitle>
          {title ??
            t('photos:pages.albums.welcomeTitle', {
              defaultValue: 'Start Your Collection',
            })}
        </EmptyTitle>
        <EmptyDescription>
          {description ??
            t('photos:pages.albums.welcomeDescription', {
              defaultValue: 'Create your first album and bring your memories to life',
            })}
        </EmptyDescription>
      </EmptyHeader>
      {showAction ? (
        <EmptyContent>
          <Button onClick={openDialog}>
            {t('photos:pages.albums.newAlbumButton', { defaultValue: 'Create Album' })}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  );
}
