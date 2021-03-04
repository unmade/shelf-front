import React from 'react';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import DeleteDialog from '../containers/DeleteDialog';
import FileBrowserActions from '../containers/FileBrowserActions';
import FileBrowserPreview from '../containers/FileBrowserPreview';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';
import MoveDialog from '../containers/MoveDialog';
import RenameFileDialog from '../containers/RenameFileDialog';

import Breadcrumbs from './ui/Breadcrumbs';

import BreadcrumbItem from './BreadcrumbItem';
import FilePreview from '../containers/FilePreview';

const Browser = React.memo(
  ({ url, dirPath, hasSelectedFiles }) => (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between p-4 border-b-2 border-gray-100">
        <Breadcrumbs path={url} itemRender={BreadcrumbItem} />
        <FileBrowserActions />
      </div>

      <div className="flex-1 flex flex-row">
        <div className="flex-1">
          <FileTableView path={dirPath || '.'} itemRender={FileTableCell} droppable />
        </div>
        {(hasSelectedFiles) && (
          <div className="w-2/6 ml-4">
            <FileBrowserPreview />
          </div>
        )}
      </div>

      <CreateFolderDialog />
      <RenameFileDialog />
      <MoveDialog />
      <DeleteDialog />
    </div>
  ),
);

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
    const { match, location, hasSelectedFiles } = this.props;
    const { dirPath } = match.params;

    const { search } = location;
    const queryParams = new URLSearchParams(search);
    const preview = queryParams.get('preview');

    return (
      <>
        <Browser url={match.url} dirPath={dirPath} hasSelectedFiles={hasSelectedFiles} />
        {(preview) && (
          <FilePreview path={dirPath || '.'} preview={preview} />
        )}
      </>
    );
  }
}

export default FileBrowser;
