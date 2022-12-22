import React from 'react';

import { useTranslation } from 'react-i18next';

import { TRASH_FOLDER_NAME } from '../constants';
import useDirPath from '../hooks/dir-path';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';
import * as icons from '../icons';
import * as routes from '../routes';

import FilePreviewContainer from '../containers/FilePreviewContainer';

import Button from '../components/ui/Button';

import Browser from '../components/Browser';
import EmptyTrashDialogProvider, {
  useEmptyTrashDialog,
} from '../components/EmptyTrashDialogProvider';
import DeleteImmediatelyDialogProvider from '../components/DeleteImmediatelyDialogProvider';
import MoveDialogProvider from '../components/MoveDialogProvider';

import ListFolderDataProvider, {
  ListFolderDataContext,
} from '../components/ListFolderDataProvider';

function EmptyTrashDialogButton() {
  const { t } = useTranslation();

  const openEmptyTrashDialog = useEmptyTrashDialog();

  return (
    <Button
      type="primary"
      title={t('Empty Trash')}
      size="base"
      onClick={openEmptyTrashDialog}
      icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
      danger
    />
  );
}

function Trash() {
  const { t } = useTranslation();

  const pathToPreview = useResolvedPreviewSearchParam();

  let dirPath = useDirPath();
  dirPath = dirPath === '.' ? TRASH_FOLDER_NAME : routes.join(TRASH_FOLDER_NAME, dirPath);

  const breadcrumbs = routes.breadcrumbs(dirPath);

  let emptyTitle;
  let emptyDescription;
  if (dirPath === TRASH_FOLDER_NAME) {
    emptyTitle = t('Trash folder is empty');
    emptyDescription = t('Deleted file will appear here');
  } else {
    emptyTitle = t('This folder is empty');
    emptyDescription = '';
  }

  return (
    <EmptyTrashDialogProvider>
      <DeleteImmediatelyDialogProvider>
        <MoveDialogProvider>
          {pathToPreview ? (
            <FilePreviewContainer dirPath={dirPath} />
          ) : (
            <Browser
              actionButton={EmptyTrashDialogButton}
              breadcrumbs={breadcrumbs}
              dirPath={dirPath}
              emptyIcon={
                <icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
              }
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
              dataProvider={ListFolderDataProvider}
              dataContext={ListFolderDataContext}
            />
          )}
        </MoveDialogProvider>
      </DeleteImmediatelyDialogProvider>
    </EmptyTrashDialogProvider>
  );
}

export default Trash;

Trash.propTypes = {};
