import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import { Heading } from '@/ui/heading';

import CopyLinkDialogProvider from '@/components/CopyLinkDialogProvider';

import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';
import { SharedLinkList } from '@/apps/files/components/shared-links-list';

export default function SharedLinks() {
  const { t } = useTranslation('sharedViaLink');

  return (
    <CopyLinkDialogProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.LinkOutlined data-slot="icon" />
            <Heading>{t('pageTitle', { defaultValue: 'Shared via link' })}</Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <SharedLinkList />
        </PageContent>
      </Page>
    </CopyLinkDialogProvider>
  );
}
