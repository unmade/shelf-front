import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import { Heading } from '@/ui/heading';

import { CopyLinkDialogProvider } from '@/apps/files/components/dialogs';

import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';
import { SharedLinkList } from '@/apps/files/components/shared-links-list';

export default function SharedLinks() {
  const { t } = useTranslation('files');

  return (
    <CopyLinkDialogProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.LinkOutlined data-slot="icon" />
            <Heading>{t('pages.sharedViaLink.title', { defaultValue: 'Shared via link' })}</Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <SharedLinkList />
        </PageContent>
      </Page>
    </CopyLinkDialogProvider>
  );
}
