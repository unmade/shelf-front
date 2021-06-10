import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../../constants';

import FileBrowserPreview from '../../containers/FileBrowserPreview';
import FileTableCell from '../../containers/FileTableCell';
import FileTableView from '../../containers/FileTableView';

import BrowserHeader from './Header';
import StatusBar from './StatusBar';

const Browser = React.memo(
  ({ actionButton, dirPath, hasSelectedFiles, withCreateFolder }) => {
    const isLaptop = useMediaQuery({ query: MediaQuery.lg });
    const previewAvailable = (isLaptop && hasSelectedFiles);
    return (
      <div className="h-full flex flex-col">
        <BrowserHeader actionButton={actionButton} withCreateFolder={withCreateFolder} />
        <div className="pt-4 flex flex-row flex-1">
          <div className={(previewAvailable) ? 'w-2/3' : 'w-full'}>
            <FileTableView path={dirPath ?? '.'} itemRender={FileTableCell} droppable />
          </div>
          {(previewAvailable) && (
            <div className="w-1/3">
              <FileBrowserPreview />
            </div>
          )}
        </div>
        <StatusBar path={dirPath ?? '.'} />
      </div>
    );
  },
);

export default Browser;

Browser.propTypes = {
  actionButton: PropTypes.func.isRequired,
  dirPath: PropTypes.string,
  hasSelectedFiles: PropTypes.bool.isRequired,
  withCreateFolder: PropTypes.bool.isRequired,
};

Browser.defaultProps = {
  dirPath: null,
};
