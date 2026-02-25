import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import { Heading } from '@/ui/heading';

import FileMembersDialogProvider from '@/components/FileMembersDialogProvider';

import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';
import { SharedFileList } from '@/apps/files/components/shared-files-list';

export default function SharedFiles() {
  const { t } = useTranslation('sharedInApp');

  return (
    <FileMembersDialogProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.ShareOutlined data-slot="icon" />
            <Heading>{t('pageTitle', { defaultValue: 'Shared with others' })}</Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <SharedFileList />
        </PageContent>
      </Page>
    </FileMembersDialogProvider>
  );
}
