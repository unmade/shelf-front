import useDirPath from '@/hooks/dir-path';

import * as routes from '@/routes';

import { Heading } from '@/ui/heading';

import CopyLinkDialogProvider from '@/components/CopyLinkDialogProvider';
import CreateFolderDialogProvider from '@/components/CreateFolderDialogProvider';
import DeleteDialogProvider from '@/components/DeleteDialogProvider';
import DeleteImmediatelyDialogProvider from '@/components/DeleteImmediatelyDialogProvider';
import GoBackButton from '@/components/GoBackButton';
import MoveDialogProvider from '@/components/MoveDialogProvider';
import RenameFileDialogProvider from '@/components/RenameFileDialogProvider';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';
import Uploader from '@/components/Uploader';

import { FileBrowser } from '@/apps/files/components/browser';
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

export default function Files() {
  const dirPath = useDirPath();

  const title = routes.folderName(dirPath);

  return (
    <DialogsProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <>
              <GoBackButton to={routes.parent(dirPath)} disabled={routes.isRoot(dirPath)} />
              <Heading>{title}</Heading>
            </>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Uploader uploadTo={dirPath ?? '.'} />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <FileBrowser path={dirPath ?? '.'} />
        </PageContent>
      </Page>
    </DialogsProvider>
  );
}
