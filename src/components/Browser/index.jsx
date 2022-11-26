import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import useSidePreview from '../../hooks/preview-available';

import { useListFolderQuery } from '../../store/files';
import { fileBrowserPathChanged, fileSelectionCleared } from '../../store/browser';

import { MediaQuery } from '../../constants';

import FileDrop from '../../containers/FileDrop';

import FileTableCell from '../FileTableCell';
import FileTableView from '../FileTableView';

import BrowserHeader from './Header';
import SidePreview from './SidePreview';
import StatusBar from './StatusBar';

function FileTableViewContainer({ dirPath, droppable, emptyIcon, emptyTitle, emptyDescription }) {
  const dispatch = useDispatch();
  const { data, isLoading: loading } = useListFolderQuery(dirPath);

  const entities = React.useMemo(
    () => data?.ids.map((id) => data?.entities[id]) ?? [],
    [data?.ids, data?.entities]
  );

  React.useEffect(() => {
    dispatch(fileBrowserPathChanged({ path: dirPath }));
    return () => {
      dispatch(fileSelectionCleared());
    };
  }, [dirPath, dispatch]);

  const fileTableView = (
    <FileTableView
      items={entities}
      loading={loading}
      path={dirPath}
      scrollKey={dirPath}
      itemRender={FileTableCell}
      emptyIcon={emptyIcon}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
    />
  );

  return droppable ? (
    <FileDrop
      className="h-full"
      uploadTo={dirPath}
      render={({ dragging }) => (
        <div className="relative h-full w-full">
          <div className={`${dragging ? 'block' : 'hidden'} absolute z-10 h-full w-full px-2 pb-2`}>
            <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
          </div>
          {fileTableView}
        </div>
      )}
    />
  ) : (
    fileTableView
  );
}

FileTableViewContainer.propTypes = {
  dirPath: PropTypes.string.isRequired,
  droppable: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

function Browser({ actionButton, dirPath, droppable, emptyIcon, emptyTitle, emptyDescription }) {
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });
  const withSidePreview = useSidePreview();
  const path = dirPath ?? '.';

  return (
    <div className="flex h-full flex-col">
      <BrowserHeader isLaptop={isLaptop} actionButton={actionButton} />
      <div className="flex h-full flex-row overflow-scroll pt-4">
        <div className={`h-full ${withSidePreview ? 'w-7/12' : 'w-full'}`}>
          <FileTableViewContainer
            dirPath={dirPath}
            droppable={droppable}
            emptyIcon={emptyIcon}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          />
        </div>
        {withSidePreview && (
          <div className="w-5/12 overflow-scroll">
            <SidePreview path={path} />
          </div>
        )}
      </div>
      <StatusBar dirPath={path} isLaptop={isLaptop} />
    </div>
  );
}

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
