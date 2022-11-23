import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fileBrowserPathChanged, filesSelectionChanged } from '../store/actions/ui';

import { Dialogs } from '../constants';
import useDirPath from '../hooks/dir-path';
import * as icons from '../icons';
import * as routes from '../routes';

import FilePreview from '../containers/FilePreview';

import Browser from '../components/Browser';
import CreateFolderDialog from '../components/CreateFolderDialog';
import DeleteDialog from '../components/DeleteDialog';
import MoveDialog from '../components/MoveDialog';
import RenameFileDialog from '../components/RenameFileDialog';
import Uploader from '../components/Uploader';

function Files() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const location = useLocation();
  const dirPath = useDirPath();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  React.useEffect(() => {
    dispatch(fileBrowserPathChanged(dirPath));

    // we want to deselect all files when
    // current directory has changed
    dispatch(filesSelectionChanged([]));
  }, [dirPath, dispatch]);

  const preparePreviewPath = (path) =>
    routes.makeUrlFromPath({ path: dirPath, queryParams: { preview: routes.basename(path) } });

  return (
    <>
      <div className={`flex h-full flex-col ${preview ? 'hidden' : 'block'}`}>
        <Browser
          actionButton={() => <Uploader />}
          dirPath={dirPath}
          droppable
          emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
          emptyTitle={t('This folder is empty')}
          emptyDescription={t('Drag and drop files to upload')}
        />
      </div>
      {preview && (
        <FilePreview dirPath={dirPath || '.'} name={preview} preparePath={preparePreviewPath} />
      )}
      <CreateFolderDialog uid={Dialogs.createFolder} />
      <RenameFileDialog uid={Dialogs.rename} />
      <MoveDialog uid={Dialogs.move} />
      <DeleteDialog uid={Dialogs.delete} />
    </>
  );
}

export default Files;
