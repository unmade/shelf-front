import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getFilesCountByPath } from '../../store/reducers/files';
import {
  getDeletingFilesCounter,
  getMovingFilesCounter,
  getIsEmptyingTrash,
} from '../../store/reducers/tasks';
import { getCountSelectedFiles } from '../../store/reducers/ui';

import { TRASH_FOLDER_NAME } from '../../constants';
import * as icons from '../../icons';

import Breadcrumb from '../ui/Breadcrumb';

function BackgroundTask({ className }) {
  const { t } = useTranslation();
  const deletingFilesCounter = useSelector(getDeletingFilesCounter);
  const movingFilesCounter = useSelector(getMovingFilesCounter);
  const isEmptyingTrash = useSelector(getIsEmptyingTrash);

  const text = [];
  if (isEmptyingTrash) {
    text.push(t('status_bar_emptying_trash_task'));
  }
  if (movingFilesCounter > 0) {
    text.push(t('status_bar_moving_task', { count: movingFilesCounter }));
  }
  if (deletingFilesCounter > 0) {
    text.push(t('status_bar_deleting_task', { count: deletingFilesCounter }));
  }

  if (text.length < 1) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex">
        <icons.Spinner className="mr-1 h-4 w-4 animate-spin text-gray-600" />
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
  const { t } = useTranslation();

  const totalCount = useSelector((state) => getFilesCountByPath(state, dirPath));
  const selectedCount = useSelector(getCountSelectedFiles);
  const text =
    selectedCount === 0
      ? t('items_count', { count: totalCount })
      : t('status_bar_select_count', { count: selectedCount, totalCount });

  return <div className={className}>{text}</div>;
}

TotalFiles.propTypes = {
  className: PropTypes.string,
  dirPath: PropTypes.string.isRequired,
};

TotalFiles.defaultProps = {
  className: '',
};

function StatusBar({ dirPath, isLaptop }) {
  return (
    <div className="bottom-0 flex w-full items-center justify-center border-t bg-gray-50 py-1 pl-6 pr-8 text-center text-xs text-gray-400 lg:justify-between">
      {isLaptop && (
        <Breadcrumb
          path={dirPath}
          itemRender={({ name, url }) => (
            <Breadcrumb.Item to={url}>
              <span className="block truncate">{name}</span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, url }) => (
            <Breadcrumb.ItemCollapsed to={url}>
              <span className="block truncate">{name}</span>
            </Breadcrumb.ItemCollapsed>
          )}
          withCreateFolder={dirPath !== TRASH_FOLDER_NAME}
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
};

StatusBar.defaultProps = {
  dirPath: '.',
  isLaptop: false,
};
