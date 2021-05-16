import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { Dialogs, MediaQuery } from '../constants';
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

import AppMenuModal from './AppMenuModal';
import * as icons from '../icons';

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
        <div className="flex flex-row items-center justify-between text-3xl p-4 border-b-2 border-gray-100">
          <div className="px-4">
            <h2 className="text-gray-900 truncate font-medium">
              Home
            </h2>
            <nav className="flex items-center text-gray-500 text-sm font-medium sm:space-x-1 whitespace-nowrap">
              <a href="/components#product-application-ui" className="hidden sm:block hover:text-gray-900">
                Application UI
              </a>
              <svg width="24" height="24" fill="none" className="hidden sm:block flex-none text-gray-300">
                <path d="M10.75 8.75l3.5 3.25-3.5 3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <a href="/components#product-application-ui-elements" className="hidden sm:block hover:text-gray-900">
                Elements
              </a>
              <svg width="24" height="24" fill="none" className="hidden sm:block flex-none text-gray-300">
                <path d="M10.75 8.75l3.5 3.25-3.5 3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <a href="/components/application-ui/elements/dropdowns" className="truncate hover:text-gray-900">
                Dropdowns
              </a>
            </nav>
          </div>
          <div className="px-4 flex text-2xl items-center space-x-8">
            <button type="button" className="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 text-gray-500 hover:text-gray-600 transition-colors duration-200 w-full py-2">
              <icons.SearchOutlined className="text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
              <span className="text-xl">
                Quick search
              </span>
              <span className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md" style={{ opacity: 1 }}>
                <kbd className="font-sans">
                  <abbr title="Command" className="no-underline">⌘</abbr>
                </kbd>
                <kbd className="font-sans">K</kbd>
              </span>
            </button>
            <button type="button" className="p-2 bg-gradient-to-br from-blue-400 to-indigo-400 hover:from-blue-300 hover:to-indigo-400 rounded-xl shadow text-gray-100 hover:bg-gray-500 hover:text-white transition-colors duration-150">
              <icons.CloudUploadOutlined />
            </button>
            <button type="button" className="text-gray-800">
              <icons.More />
            </button>
          </div>

          {/* <div className="min-w-0 flex-1 inline-flex items-center"> */}
            {/* {(!isLaptop) && (
              <AppMenuModal />
            )}
            <span className="min-w-0 w-full mx-4">
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
            </span> */}
          {/* </div> */}
          {/* <FileBrowserActions collapsed={!isTablet} /> */}
        </div>

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
