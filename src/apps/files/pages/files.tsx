import { useCallback } from 'react';

import type { UploadEntries } from '@/types/uploads';

import { useAppDispatch } from '@/hooks';
import { useDirPath } from '@/hooks/dir-path';

import * as routes from '@/routes';

import { useListFolderQuery } from '@/store/files';
import { fileEntriesAdded } from '@/store/uploads/slice';

import { CloudUploadIcon } from '@/icons';

import { Heading } from '@/ui/heading';
import { Button } from '@/ui/button';

import FileDrop from '@/components/FileDrop';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';
import Uploader from '@/components/Uploader';

import { BreadcrumbDropdown, useRouteBreadcrumbs } from '@/apps/files/components/breadcrumbs';
import { DialogsProvider } from '@/apps/files/components/dialogs';
import { AddActionsDropdown } from '@/apps/files/components/add-actions-dropdown';
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
  const dispatch = useAppDispatch();
  const dirPath = useDirPath();
  const path = dirPath ?? '.';

  const title = routes.folderName(dirPath ?? '.');
  const breadcrumbs = useRouteBreadcrumbs();

  const handleFilesAdded = useCallback(
    (files: UploadEntries) => {
      dispatch(fileEntriesAdded({ files, uploadTo: path }));
    },
    [dispatch, path],
  );

  return (
    <AllDialogsProvider>
      <FileDrop className="h-full" onFilesAdded={handleFilesAdded}>
        {({ dragging }) => (
          <Page className="relative">
            {dragging && (
              <div className="absolute inset-0 z-10 mb-10 px-2 pt-2">
                <div className="h-full w-full rounded-2xl border-3 border-dashed border-teal-200 dark:border-teal-600" />
              </div>
            )}
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
                <Uploader onFilesAdded={handleFilesAdded} uploadScope="files">
                  <Button variant="ghost" size="icon">
                    <CloudUploadIcon />
                  </Button>
                </Uploader>
                <AddActionsDropdown uploadTo={path} />
              </PageHeaderActions>
            </PageHeader>
            <PageContent>
              <FileBrowserContainer path={path} />
            </PageContent>
          </Page>
        )}
      </FileDrop>
    </AllDialogsProvider>
  );
}
