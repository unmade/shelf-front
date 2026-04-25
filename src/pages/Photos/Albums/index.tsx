import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/ui/heading';

import { AlbumDialogsProvider } from '@/apps/photos/components/dialogs';

import { Page, PageHeader, PageHeaderActions, PageContent } from 'apps/photos/components/page';

import Content from './Content';
import CreateAlbumButton from './CreateAlbumButton';

export default function Albums() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.albums.title', { defaultValue: 'Albums' });

  return (
    <AlbumDialogsProvider>
      <Helmet>
        <title>Shelf Photos</title>
      </Helmet>
      <Page>
        <PageHeader>
          <Heading className="py-0.5">{title}</Heading>
          <PageHeaderActions>
            <CreateAlbumButton />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Content />
        </PageContent>
      </Page>
    </AlbumDialogsProvider>
  );
}
