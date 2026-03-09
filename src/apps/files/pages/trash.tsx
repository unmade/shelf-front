import { useTranslation } from 'react-i18next';

import useDirPath from '@/hooks/dir-path';

import { TRASH_FOLDER_NAME } from '@/constants';
import * as icons from '@/icons';
import * as routes from '@/routes';

import { useListFolderQuery } from '@/store/files';

import { Button } from '@/ui/button';
import { Heading } from '@/ui/heading';

import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { BreadcrumbDropdown, useRouteBreadcrumbs } from '@/apps/files/components/breadcrumbs';
import {
  DialogsProvider,
  EmptyTrashDialogProvider,
  useEmptyTrashDialog,
} from '@/apps/files/components/dialogs';
import { FileBrowser, FileBrowserDataProvider } from '@/apps/files/components/browser';
import { GoBackButton } from '@/apps/files/components/go-back-button';
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/apps/files/components/page';

function EmptyTrashDialogButton() {
  const { t } = useTranslation('files');

  const openEmptyTrashDialog = useEmptyTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('dialogs.emptyTrash.title', { defaultValue: 'Empty Trash' })}
      onClick={openEmptyTrashDialog}
    >
      <icons.TrashOutlined />
    </Button>
  );
}

interface DialogsProviderProps {
  children: React.ReactNode;
}

function AllDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <VerifyAccountDialogProvider>
      <DialogsProvider>
        <EmptyTrashDialogProvider>{children}</EmptyTrashDialogProvider>
      </DialogsProvider>
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
  const breadcrumbs = useRouteBreadcrumbs();

  return (
    <AllDialogsProvider>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <div className="sm:hidden">
              <BreadcrumbDropdown items={breadcrumbs} />
            </div>
            <div className="flex min-w-0 items-center max-sm:hidden sm:gap-2">
              <GoBackButton path={path} />
              <Heading className="truncate">{title}</Heading>
            </div>
          </PageHeaderTitle>
          <PageHeaderActions>
            <EmptyTrashDialogButton />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <FileBrowserContainer path={path} />
        </PageContent>
      </Page>
    </AllDialogsProvider>
  );
}
