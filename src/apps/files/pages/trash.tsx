import useDirPath from '@/hooks/dir-path';

import { TRASH_FOLDER_NAME } from '@/constants';
import * as icons from '@/icons';
import * as routes from '@/routes';

import { useListFolderQuery } from '@/store/files';

import { Button } from '@/ui/button';
import { Heading } from '@/ui/heading';

import CopyLinkDialogProvider from '@/components/CopyLinkDialogProvider';
import CreateFolderDialogProvider from '@/components/CreateFolderDialogProvider';
import DeleteDialogProvider from '@/components/DeleteDialogProvider';
import DeleteImmediatelyDialogProvider from '@/components/DeleteImmediatelyDialogProvider';
import EmptyTrashDialogProvider, {
  useEmptyTrashDialog,
} from '@/components/EmptyTrashDialogProvider';
import MoveDialogProvider from '@/components/MoveDialogProvider';
import RenameFileDialogProvider from '@/components/RenameFileDialogProvider';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { FileBrowser, FileBrowserDataProvider } from '@/apps/files/components/browser';
import { GoBackButton } from '@/apps/files/components/go-back-button';
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/apps/files/components/page';
import { useTranslation } from 'react-i18next';

function EmptyTrashDialogButton() {
  const { t } = useTranslation();

  const openEmptyTrashDialog = useEmptyTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('Empty Trash')}
      onClick={openEmptyTrashDialog}
    >
      <icons.TrashOutlined />
    </Button>
  );
}

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
              <EmptyTrashDialogProvider>
                <MoveDialogProvider>
                  <RenameFileDialogProvider>{children}</RenameFileDialogProvider>
                </MoveDialogProvider>
              </EmptyTrashDialogProvider>
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

export default function Trash() {
  const dirPath = useDirPath();
  const path = routes.join(TRASH_FOLDER_NAME, dirPath);

  const title = routes.folderName(path);

  return (
    <DialogsProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <>
              <GoBackButton path={path} />
              <Heading>{title}</Heading>
            </>
          </PageHeaderTitle>
          <PageHeaderActions>
            <EmptyTrashDialogButton />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <FileBrowserContainer path={path} />
        </PageContent>
      </Page>
    </DialogsProvider>
  );
}
