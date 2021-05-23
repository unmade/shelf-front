import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../../constants';

import FileBrowserPreview from '../../containers/FileBrowserPreview';
import FileTableCell from '../../containers/FileTableCell';
import FileTableView from '../../containers/FileTableView';

import BrowserHeader from './Header';

const Browser = React.memo(
  ({ actionButton, dirPath, hasSelectedFiles }) => {
    const isLaptop = useMediaQuery({ query: MediaQuery.lg });
    const previewAvailable = (isLaptop && hasSelectedFiles);
    return (
      <div className="h-full flex flex-col">
        <BrowserHeader actionButton={actionButton} />
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
      </div>
    );
  },
);

export default Browser;

Browser.propTypes = {
  actionButton: PropTypes.func.isRequired,
};
