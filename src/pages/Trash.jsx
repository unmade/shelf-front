import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { Dialogs, TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import { listFolder } from '../store/actions/files';
import { deselectFiles, openDialog, setCurrentPath } from '../store/actions/ui';

import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FilePreview from '../containers/FilePreview';

import Button from '../components/ui/Button';

import Browser from '../components/Browser';
import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';
import MoveDialog from '../components/MoveDialog';

function Trash() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  let { dirPath } = params;
  dirPath = dirPath ? `${TRASH_FOLDER_NAME}/${decodeURIComponent(dirPath)}` : TRASH_FOLDER_NAME;

  React.useEffect(() => {
    dispatch(setCurrentPath(dirPath));
    dispatch(listFolder(dirPath));

    // we want to deselect all files when
    // current directory has changed
    dispatch(deselectFiles());
  }, [dirPath, dispatch]);

  return (
    <>
      <Browser
        actionButton={() => (
          <Button
            type="primary"
            title={t('Empty Trash')}
            size="base"
            onClick={() => dispatch(openDialog(Dialogs.emptyTrash))}
            icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
            danger
          />
        )}
        dirPath={dirPath}
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
