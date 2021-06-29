import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { Dialogs, TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import { getHasSelectedFiles } from '../store/reducers/files';

import { deselectFiles, listFolder } from '../store/actions/files';
import { openDialog, setCurrentPath } from '../store/actions/ui';

import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FilePreview from '../containers/FilePreview';

import Button from '../components/ui/Button';

import Browser from '../components/Browser';
import DeleteImmediatelyDialog from '../components/DeleteImmediatelyDialog';

function Trash() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const hasSelectedFiles = useSelector(getHasSelectedFiles);

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  let { dirPath } = params;
  dirPath = (dirPath) ? `${TRASH_FOLDER_NAME}/${dirPath}` : TRASH_FOLDER_NAME;

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
            title="Empty Trash"
            size="base"
            onClick={() => dispatch(openDialog(Dialogs.emptyTrash))}
            icon={<icons.TrashOutlined className="flex-shrink-0 w-5 h-5" />}
            danger
          />
        )}
        dirPath={dirPath}
        hasSelectedFiles={hasSelectedFiles}
        withCreateFolder={false}
      />
      {(preview) && (
        <FilePreview dirPath={dirPath || '.'} name={preview} />
      )}
      <EmptyTrashDialog uid={Dialogs.emptyTrash} />
      <DeleteImmediatelyDialog uid={Dialogs.deleteImmediately} />
    </>
  );
}

export default Trash;

Trash.propTypes = {};
