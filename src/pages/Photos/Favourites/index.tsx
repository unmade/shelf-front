import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Heading from 'components/ui/Heading';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';

import AddToAlbumDialogProvider from 'components/photos/AddToAlbumDialogProvider';
import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import { Page, PageHeader, PageContent } from 'apps/photos/components/page';

import Content from './Content';

export default function Favourites() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.favourite.title', { defaultValue: 'Favourites' });

  return (
    <AddToAlbumDialogProvider>
      <CopyLinkDialogProvider>
        <DeleteMediaItemsDialogProvider>
          <Helmet>
            <title>Shelf Photos</title>
          </Helmet>
          <Page>
            <PageHeader>
              <Heading className="py-0.5">{title}</Heading>
            </PageHeader>
            <PageContent>
              <Content />
            </PageContent>
          </Page>
        </DeleteMediaItemsDialogProvider>
      </CopyLinkDialogProvider>
    </AddToAlbumDialogProvider>
  );
}
