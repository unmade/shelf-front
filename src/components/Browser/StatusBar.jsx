import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getCountSelectedFiles, getFilesCountByPath } from '../../store/reducers/files';
import { getDeletingFilesCounter, getMovingFilesCounter, getIsEmptyingTrash } from '../../store/reducers/tasks';

import * as icons from '../../icons';
import pluralize from '../../pluralize';

import Breadcrumb from '../ui/Breadcrumb';

function BackgroundTask({ className }) {
  const deletingFilesCounter = useSelector(getDeletingFilesCounter);
  const movingFilesCounter = useSelector(getMovingFilesCounter);
  const isEmptyingTrash = useSelector(getIsEmptyingTrash);

  const text = [];
  if (isEmptyingTrash) {
    text.push('Emptying the Trash');
  }
  if (movingFilesCounter > 0) {
    text.push(`Moving ${movingFilesCounter} ${pluralize('file', movingFilesCounter)}`);
  }
  if (deletingFilesCounter > 0) {
    text.push(`Deleting ${deletingFilesCounter} ${pluralize('file', deletingFilesCounter)}`);
  }

  if (text.length < 1) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex">
        <icons.Spinner className="mr-1 w-4 h-4 text-gray-600 animate-spin" />
        {text.join(' / ')}
      </div>
    </div>
  );
}

BackgroundTask.propTypes = {
  className: PropTypes.string,
};

BackgroundTask.defaultProps = {
  className: '',
};

function TotalFiles({ className, dirPath }) {
  const totalCount = useSelector((state) => getFilesCountByPath(state, dirPath));
  const selectedCount = useSelector(getCountSelectedFiles);
  const text = (selectedCount === 0) ? (
    `${totalCount} ${pluralize('item', totalCount)}`
  ) : (
    `${selectedCount} of ${totalCount} selected`
  );

  return (
    <div className={className}>
      {text}
    </div>
  );
}

TotalFiles.propTypes = {
  className: PropTypes.string,
  dirPath: PropTypes.string.isRequired,
};

TotalFiles.defaultProps = {
  className: '',
};

function StatusBar({ dirPath, isLaptop, withCreateFolder }) {
  return (
    <div className="bottom-0 w-full pl-6 pr-8 py-1 flex items-center justify-center lg:justify-between border-t bg-gray-50 text-xs text-center text-gray-400">
      {(isLaptop) && (
        <Breadcrumb
          path={dirPath}
          itemRender={({ name, url }) => (
            <Breadcrumb.Item to={url}>
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, url }) => (
            <Breadcrumb.ItemCollapsed to={url}>
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.ItemCollapsed>
          )}
          withCreateFolder={withCreateFolder}
        />
      )}
      <div className="flex">
        <BackgroundTask />
        <TotalFiles className="ml-6" dirPath={dirPath} />
      </div>
    </div>
  );
}

export default StatusBar;

StatusBar.propTypes = {
  dirPath: PropTypes.string,
  isLaptop: PropTypes.bool,
  withCreateFolder: PropTypes.bool,
};

StatusBar.defaultProps = {
  dirPath: '.',
  isLaptop: false,
  withCreateFolder: false,
};
