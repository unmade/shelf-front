import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../../constants';

import FileDrop from '../../containers/FileDrop';
import FileTableView from '../../containers/FileTableView';

import FileTableCell from '../FileTableCell';

import BrowserHeader from './Header';
import SidePreview from './SidePreview';
import StatusBar from './StatusBar';
import useSidePreview from '../../hooks/preview-available';

const Browser = React.memo(
  ({ actionButton, dirPath, droppable, emptyIcon, emptyTitle, emptyDescription }) => {
    const isLaptop = useMediaQuery({ query: MediaQuery.lg });
    const withSidePreview = useSidePreview();
    const path = dirPath ?? '.';

    const fileTableView = (
      <FileTableView
        path={path}
        scrollKey={path}
        itemRender={FileTableCell}
        emptyIcon={emptyIcon}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
    );

    const tableView = droppable ? (
      <FileDrop
        className="h-full"
        uploadTo={path}
        render={({ dragging }) => (
          <div className="relative h-full w-full">
            <div
              className={`${dragging ? 'block' : 'hidden'} absolute z-10 h-full w-full px-2 pb-2`}
            >
              <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
            </div>
            {fileTableView}
          </div>
        )}
      />
    ) : (
      fileTableView
    );

    return (
      <div className="flex h-full flex-col">
        <BrowserHeader isLaptop={isLaptop} actionButton={actionButton} />
        <div className="flex h-full flex-row overflow-scroll pt-4">
          <div className={`h-full ${withSidePreview ? 'w-7/12' : 'w-full'}`}>{tableView}</div>
          {withSidePreview && (
            <div className="w-5/12 overflow-scroll">
              <SidePreview />
            </div>
          )}
        </div>
        <StatusBar dirPath={path} isLaptop={isLaptop} />
      </div>
    );
  }
);

export default Browser;

Browser.propTypes = {
  actionButton: PropTypes.func.isRequired,
  dirPath: PropTypes.string,
  droppable: PropTypes.bool,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

Browser.defaultProps = {
  dirPath: null,
  droppable: false,
};
