import * as icons from '@/icons';

import { useListBookmarkedFilesQuery } from '@/store/files';

import { Heading } from '@/ui/heading';

import CopyLinkDialogProvider from '@/components/CopyLinkDialogProvider';
import CreateFolderDialogProvider from '@/components/CreateFolderDialogProvider';
import DeleteDialogProvider from '@/components/DeleteDialogProvider';
import DeleteImmediatelyDialogProvider from '@/components/DeleteImmediatelyDialogProvider';
import MoveDialogProvider from '@/components/MoveDialogProvider';
import RenameFileDialogProvider from '@/components/RenameFileDialogProvider';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { FileBrowser, FileBrowserDataProvider } from '@/apps/files/components/browser';
import { Page, PageContent, PageHeader, PageHeaderTitle } from '@/apps/files/components/page';

interface DialogsProviderProps {
  children: React.ReactNode;
}

function DialogsProvider({ children }: DialogsProviderProps) {
  return (
    <VerifyAccountDialogProvider>
      <CopyLinkDialogProvider>
        <CreateFolderDialogProvider>
          <DeleteDialogProvider>
            <DeleteImmediatelyDialogProvider>
              <MoveDialogProvider>
                <RenameFileDialogProvider>{children}</RenameFileDialogProvider>
              </MoveDialogProvider>
            </DeleteImmediatelyDialogProvider>
          </DeleteDialogProvider>
        </CreateFolderDialogProvider>
      </CopyLinkDialogProvider>
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
  const title = 'Bookmarks';

  return (
    <DialogsProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.BookmarkOutlined data-slot="icon" />
            <Heading>{title}</Heading>
          </PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <FileBrowserContainer path="bookmarks" />
        </PageContent>
      </Page>
    </DialogsProvider>
  );
}
