import useDirPath from '@/hooks/dir-path';

import * as routes from '@/routes';

import { useListFolderQuery } from '@/store/files';

import { Heading } from '@/ui/heading';

import CopyLinkDialogProvider from '@/components/CopyLinkDialogProvider';
import CreateFolderDialogProvider from '@/components/CreateFolderDialogProvider';
import DeleteDialogProvider from '@/components/DeleteDialogProvider';
import DeleteImmediatelyDialogProvider from '@/components/DeleteImmediatelyDialogProvider';
import FileDrop from '@/components/FileDrop';
import MoveDialogProvider from '@/components/MoveDialogProvider';
import RenameFileDialogProvider from '@/components/RenameFileDialogProvider';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';
import Uploader from '@/components/Uploader';

import { FileBrowser, FileBrowserDataProvider } from '@/apps/files/components/browser';
import { GoBackButton } from '@/apps/files/components/go-back-button';
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/apps/files/components/page';

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
  const { data, isLoading, isError } = useListFolderQuery(path, {
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
  const dirPath = useDirPath();
  const path = dirPath ?? '.';

  const title = routes.folderName(dirPath);

  return (
    <DialogsProvider>
      <FileDrop className="h-full" uploadTo={path}>
        {({ dragging }) => (
          <Page className="relative">
            {dragging && (
              <div className="absolute inset-0 z-10 mb-10 px-2 pt-2">
                <div className="h-full w-full rounded-2xl border-3 border-dashed border-teal-200 dark:border-teal-600" />
              </div>
            )}
            <PageHeader>
              <PageHeaderTitle>
                <>
                  <GoBackButton path={path} />
                  <Heading>{title}</Heading>
                </>
              </PageHeaderTitle>
              <PageHeaderActions>
                <Uploader uploadTo={path} />
              </PageHeaderActions>
            </PageHeader>
            <PageContent>
              <FileBrowserContainer path={path} />
            </PageContent>
          </Page>
        )}
      </FileDrop>
    </DialogsProvider>
  );
}
