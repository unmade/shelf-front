import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';

import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';
import DeleteMediaItemsImmediatelyDialogProvider from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';

import { Page, PageHeader, PageContent } from 'apps/photos/components/page';

import Content from './Content';
import Heading from 'components/ui/Heading';

export default function SharedLinks() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.sharedViaLink.title', { defaultValue: 'Shared via link' });

  return (
    <CopyLinkDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <DeleteMediaItemsImmediatelyDialogProvider>
          <Helmet>
            <title>Shelf Photos - {title}</title>
          </Helmet>
          <Page>
            <PageHeader>
              <Heading className="py-0.5">{title}</Heading>
            </PageHeader>
            <PageContent>
              <Content />
            </PageContent>
          </Page>
        </DeleteMediaItemsImmediatelyDialogProvider>
      </DeleteMediaItemsDialogProvider>
    </CopyLinkDialogProvider>
  );
}
