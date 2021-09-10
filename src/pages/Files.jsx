import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { getHasSelectedFiles } from '../store/reducers/files';

import { deselectFiles, listFolder } from '../store/actions/files';
import { setCurrentPath } from '../store/actions/ui';

import { Dialogs } from '../constants';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import FilePreview from '../containers/FilePreview';
import RenameFileDialog from '../containers/RenameFileDialog';

import Browser from '../components/Browser';
import DeleteDialog from '../components/DeleteDialog';
import MoveDialog from '../components/MoveDialog';
import Uploader from '../components/Uploader';

function Files() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const hasSelectedFiles = useSelector(getHasSelectedFiles);

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  const dirPath = decodeURIComponent(params.dirPath ?? '.');

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
        actionButton={() => <Uploader />}
        dirPath={dirPath}
        hasSelectedFiles={hasSelectedFiles}
        withCreateFolder
      />
      {(preview) && (
        <FilePreview dirPath={dirPath || '.'} name={preview} />
      )}
      <CreateFolderDialog uid={Dialogs.createFolder} />
      <RenameFileDialog uid={Dialogs.rename} />
      <MoveDialog uid={Dialogs.move} />
      <DeleteDialog uid={Dialogs.delete} />
    </>
  );
}

export default Files;
