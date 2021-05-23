import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { Dialogs, MediaQuery } from '../../constants';

import CreateFolderDialog from '../../containers/CreateFolderDialog';
import DeleteDialog from '../../containers/DeleteDialog';
import FileBrowserPreview from '../../containers/FileBrowserPreview';
import FileTableCell from '../../containers/FileTableCell';
import FileTableView from '../../containers/FileTableView';
import MoveDialog from '../../containers/MoveDialog';
import RenameFileDialog from '../../containers/RenameFileDialog';

import BrowserHeader from './Header';

const Browser = React.memo(
  ({ dirPath, hasSelectedFiles }) => {
    const isLaptop = useMediaQuery({ query: MediaQuery.lg });
    const previewAvailable = (isLaptop && hasSelectedFiles);
    return (
      <div className="h-full flex flex-col">
        <BrowserHeader />
        <div className="flex-1 flex flex-row pt-0">
          <div className={(previewAvailable) ? 'w-2/3' : 'w-full'}>
            <FileTableView path={dirPath || '.'} itemRender={FileTableCell} droppable />
          </div>
          {(previewAvailable) && (
            <div className="w-1/3">
              <FileBrowserPreview />
            </div>
          )}
        </div>

        <CreateFolderDialog uid={Dialogs.createFolder} />
        <RenameFileDialog uid={Dialogs.rename} />
        <MoveDialog uid={Dialogs.move} />
        <DeleteDialog uid={Dialogs.delete} />
      </div>
    );
  },
);

export default Browser;
