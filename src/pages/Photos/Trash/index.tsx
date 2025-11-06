import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Heading from 'components/ui/Heading';

import DeleteMediaItemsImmediatelyDialogProvider from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';
import EmptyMediaItemsTrashDialogProvider from 'components/photos/EmptyMediaItemsTrashDialogProvider';

import { Page, PageHeader, PageHeaderActions, PageContent } from 'apps/photos/components/page';

import Content from './Content';
import EmptyTrashDialogButton from './EmptyTrashDialogButton';

export default function Trash() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.title', { defaultValue: 'Trash' });

  return (
    <DeleteMediaItemsImmediatelyDialogProvider>
      <EmptyMediaItemsTrashDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <Page>
          <PageHeader>
            <Heading className="py-0.5">{title}</Heading>
            <PageHeaderActions>
              <EmptyTrashDialogButton />
            </PageHeaderActions>
          </PageHeader>
          <PageContent>
            <Content />
          </PageContent>
        </Page>
      </EmptyMediaItemsTrashDialogProvider>
    </DeleteMediaItemsImmediatelyDialogProvider>
  );
}
