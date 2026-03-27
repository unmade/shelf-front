import { useTranslation } from 'react-i18next';

import { BookmarksIcon } from '@/icons';

import { useListBookmarkedFilesQuery } from '@/store/files';

import { Heading } from '@/ui/heading';

import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { DialogsProvider } from '@/apps/files/components/dialogs';

import { FileBrowser, FileBrowserDataProvider } from '@/apps/files/components/browser';
import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';

interface DialogsProviderProps {
  children: React.ReactNode;
}

function AllDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <VerifyAccountDialogProvider>
      <DialogsProvider>{children}</DialogsProvider>
    </VerifyAccountDialogProvider>
  );
}

interface FileBrowserContainerProps {
  path: string;
}

function FileBrowserContainer({ path }: FileBrowserContainerProps) {
  const { data, isLoading, isError } = useListBookmarkedFilesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data,
      isLoading,
      isError,
    }),
  });

  return (
    <FileBrowserDataProvider data={data} isLoading={isLoading} isError={isError}>
      <FileBrowser scrollKey={path} />
    </FileBrowserDataProvider>
  );
}

export default function Files() {
  const { t } = useTranslation('files');
  const title = t('pages.bookmarks.title', { defaultValue: 'Bookmarks' });

  return (
    <AllDialogsProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <BookmarksIcon data-slot="icon" />
            <Heading>{title}</Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <FileBrowserContainer path="bookmarks" />
        </PageContent>
      </Page>
    </AllDialogsProvider>
  );
}
