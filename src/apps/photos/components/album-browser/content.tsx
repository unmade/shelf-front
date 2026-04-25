import { useTranslation } from 'react-i18next';

import { Spinner } from '@/ui/spinner';

import { useAlbumsBrowserData } from './contexts/data';
import { AlbumsBrowserEmpty } from './empty';
import { GridView } from './grid-view';

export function AlbumsBrowserContent() {
  const { t } = useTranslation('photos');
  const { data, isLoading, isError } = useAlbumsBrowserData();

  if (isLoading) {
    return <Spinner className="flex-1" />;
  }

  if (isError) {
    return (
      <AlbumsBrowserEmpty
        showAction={false}
        title={t('browser.albums.error.title', { defaultValue: 'Unable to load albums' })}
        description={t('browser.albums.error.description', {
          defaultValue: 'There was an error loading your albums. Please try again.',
        })}
      />
    );
  }

  if (!data || data.ids.length === 0) {
    return <AlbumsBrowserEmpty />;
  }

  return <GridView data={data} />;
}
