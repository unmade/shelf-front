import { useTranslation } from 'react-i18next';

import { Spinner } from '@/ui/spinner';

import { useMediaItemsBrowserData } from './contexts/data';
import { useMediaItemBrowser } from './contexts/ui';
import { MediaItemBrowserEmpty } from './empty';
import { GridView } from './grid-view';

export function MediaItemBrowserContent() {
  const { t } = useTranslation('photos');
  const { viewMode } = useMediaItemBrowser();
  const { data, isLoading, isError } = useMediaItemsBrowserData();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <MediaItemBrowserEmpty
        title={t('browser.error.title', { defaultValue: 'Unable to load photos' })}
        description={t('browser.error.description', {
          defaultValue: 'There was an error loading your library. Please try again.',
        })}
      />
    );
  }

  if (!data || data.ids.length === 0) {
    return <MediaItemBrowserEmpty />;
  }

  if (viewMode === 'grid') {
    return <GridView data={data} />;
  }

  return <GridView data={data} />;
}
