import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import DeleteDialog from '../containers/DeleteDialog';
import FileBrowserActions from '../containers/FileBrowserActions';
import FileBrowserPreview from '../containers/FileBrowserPreview';
import FilePreview from '../containers/FilePreview';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';
import MoveDialog from '../containers/MoveDialog';
import RenameFileDialog from '../containers/RenameFileDialog';

import Breadcrumb from './ui/Breadcrumb';
import Button from './ui/Button';

const Browser = React.memo(
  ({ url, dirPath, hasSelectedFiles }) => {
    const isTablet = useMediaQuery({ query: MediaQuery.sm });
    const isLaptop = useMediaQuery({ query: MediaQuery.lg });
    const previewAvailable = (isLaptop && hasSelectedFiles);
    let fold = Breadcrumb.Fold.collapse;
    if (!isTablet) {
      fold = Breadcrumb.Fold.single;
    } else if (isLaptop) {
      fold = Breadcrumb.Fold.collapseWide;
    }
    return (
      <div className="h-full flex flex-col">
        <div className="flex flex-row items-center justify-between space-x-4 text-lg p-4 border-b-2 border-gray-100">
          <div className="min-w-0 flex-1 inline-flex items-center space-x-4">
            {(!isLaptop) && (
              <Button
                type="text"
                size="lg"
                icon={<icons.Menu />}
              />
            )}
            <span className="min-w-0 w-full">
              <Breadcrumb
                items={routes.breadcrumbs(url)}
                fold={fold}
                itemRender={({ name, path }) => (
                  <Breadcrumb.Item path={path}>
                    <span className="block truncate">
                      {name}
                    </span>
                  </Breadcrumb.Item>
                )}
                itemRenderCollapsed={({ name, path }) => (
                  <Breadcrumb.ItemCollapsed path={path}>
                    <span className="block truncate">
                      {name}
                    </span>
                  </Breadcrumb.ItemCollapsed>
                )}
              />
            </span>
          </div>
          <FileBrowserActions collapsed={!isTablet} />
        </div>

        <div className="flex-1 flex flex-row">
          <div className={(previewAvailable) ? 'w-2/3' : 'w-full'}>
            <FileTableView path={dirPath || '.'} itemRender={FileTableCell} droppable />
          </div>
          {(previewAvailable) && (
            <div className="w-1/3">
              <FileBrowserPreview />
            </div>
          )}
        </div>

        <CreateFolderDialog />
        <RenameFileDialog />
        <MoveDialog />
        <DeleteDialog />
      </div>
    );
  },
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
          <FilePreview dirPath={dirPath || '.'} name={preview} />
        )}
      </>
    );
  }
}

export default FileBrowser;
