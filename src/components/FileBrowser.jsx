import React from 'react';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import DeleteDialog from '../containers/DeleteDialog';
import FileBrowserActions from '../containers/FileBrowserActions';
import FilePreview from '../containers/FilePreview';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';
import MoveDialog from '../containers/MoveDialog';
import RenameFileDialog from '../containers/RenameFileDialog';

import Breadcrumbs from './ui/Breadcrumbs';

import BreadcrumbItem from './BreadcrumbItem';

class FileBrowser extends React.Component {
  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (match.params.dirPath !== prevMatch.params.dirPath) {
      this.loadFiles();
    }
  }

  loadFiles() {
    const { match, listFolder, deselectFiles, changePath } = this.props;
    const { dirPath } = match.params;
    changePath(dirPath);
    listFolder(dirPath);

    // we want to deselect all files when
    // current directory has changed
    deselectFiles();
  }

  render() {
    const { match, hasSelectedFiles } = this.props;
    const { dirPath } = match.params;

    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between p-4 border-b-2 border-gray-100">
          <Breadcrumbs path={match.url} itemRender={BreadcrumbItem} />
          <FileBrowserActions />
        </div>

        <div className="flex-1 flex flex-row">
          <div className="flex-1">
            <FileTableView path={dirPath || '.'} itemRender={FileTableCell} droppable />
          </div>
          {(hasSelectedFiles) && (
            <div className="w-2/6">
              <FilePreview />
            </div>
          )}
        </div>

        <CreateFolderDialog />
        <RenameFileDialog />
        <MoveDialog />
        <DeleteDialog />
      </div>
    );
  }
}

export default FileBrowser;
