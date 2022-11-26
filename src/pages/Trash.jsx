import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Dialogs, TRASH_FOLDER_NAME } from '../constants';
import useDirPath from '../hooks/dir-path';
import * as icons from '../icons';
import * as routes from '../routes';

import { fileDialogOpened } from '../store/actions/ui';

import FilePreview from '../containers/FilePreview';

import Button from '../components/ui/Button';

import Browser from '../components/Browser';
import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';
import EmptyTrashDialog from '../components/EmptyTrashDialog';
import MoveDialog from '../components/MoveDialog';

function Trash() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    <>
      <Browser
        actionButton={() => (
          <Button
            type="primary"
            title={t('Empty Trash')}
            size="base"
            onClick={() => dispatch(fileDialogOpened(Dialogs.emptyTrash))}
            icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
            danger
          />
        )}
        dirPath={dirPath}
        emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
      {preview && <FilePreview dirPath={dirPath || '.'} name={preview} />}
      <MoveDialog uid={Dialogs.move} />
      <EmptyTrashDialog uid={Dialogs.emptyTrash} />
      <DeleteImmediatelyDialog uid={Dialogs.deleteImmediately} />
    </>
  );
}

export default Trash;

Trash.propTypes = {};
