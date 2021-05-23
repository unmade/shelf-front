import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { getHasSelectedFiles } from '../store/reducers/files';

import { deselectFiles, listFolder, changePath } from '../store/actions/files';

import { Dialogs } from '../constants';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import DeleteDialog from '../containers/DeleteDialog';
import FilePreview from '../containers/FilePreview';
import MoveDialog from '../containers/MoveDialog';
import RenameFileDialog from '../containers/RenameFileDialog';

import Browser from '../components/Browser';
import Uploader from '../components/Uploader';

function Files() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const hasSelectedFiles = useSelector(getHasSelectedFiles);

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  const { dirPath } = params;

  React.useEffect(() => {
    dispatch(changePath(dirPath));
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
