import { useTranslation } from 'react-i18next';

import { ShareIcon } from '@/icons';

import { Heading } from '@/ui/heading';

import { FileMembersDialogProvider } from '@/apps/files/components/dialogs';
import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';
import { SharedFileList } from '@/apps/files/components/shared-files-list';

export default function SharedFiles() {
  const { t } = useTranslation('files');

  return (
    <FileMembersDialogProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <ShareIcon data-slot="icon" />
            <Heading>
              {t('pages.sharedInApp.title', { defaultValue: 'Shared with others' })}
            </Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <SharedFileList />
        </PageContent>
      </Page>
    </FileMembersDialogProvider>
  );
}
