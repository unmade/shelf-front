import React from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { TRASH_FOLDER_NAME } from '../constants';
import useDirPath from '../hooks/dir-path';
import * as icons from '../icons';
import * as routes from '../routes';

import FilePreview from '../containers/FilePreview';

import Button from '../components/ui/Button';

import Browser from '../components/Browser';
import EmptyTrashDialogProvider, {
  useEmptyTrashDialog,
} from '../components/EmptyTrashDialogProvider';
import DeleteImmediatelyDialogProvider from '../components/DeleteImmediatelyDialogProvider';
import MoveDialogProvider from '../components/MoveDialogProvider';

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
  const location = useLocation();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  let dirPath = useDirPath();
  dirPath = dirPath === '.' ? TRASH_FOLDER_NAME : routes.join(TRASH_FOLDER_NAME, dirPath);

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
          <Browser
            actionButton={EmptyTrashDialogButton}
            dirPath={dirPath}
            emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          />
          {preview && <FilePreview dirPath={dirPath || '.'} name={preview} />}
        </MoveDialogProvider>
      </DeleteImmediatelyDialogProvider>
    </EmptyTrashDialogProvider>
  );
}

export default Trash;

Trash.propTypes = {};
