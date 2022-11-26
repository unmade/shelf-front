import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectAllSelectedFileIds } from '../../store/browser';
import { selectListFolderData } from '../../store/files';
import { scopes, selectCounterByScope } from '../../store/tasks';

import { selectIsUploading, selectVisibleUploadsLength } from '../../store/uploads';

import { TRASH_FOLDER_NAME } from '../../constants';
import * as icons from '../../icons';

import Breadcrumb from '../ui/Breadcrumb';

function BackgroundTask({ className }) {
  const { t } = useTranslation(['translation', 'uploads']);

  const deletingFilesCounter = useSelector(
    (state) =>
      selectCounterByScope(state, scopes.deletingImmediatelyBatch) +
      selectCounterByScope(state, scopes.movingToTrash)
  );
  const emptyingTrash = useSelector(
    (state) => selectCounterByScope(state, scopes.emptyingTrash) !== 0
  );
  const movingFilesCounter = useSelector((state) =>
    selectCounterByScope(state, scopes.movingBatch)
  );

  const uploading = useSelector(selectIsUploading);
  const uploadsCounter = useSelector((state) => selectVisibleUploadsLength(state, 'inProgress'));

  const text = [];
  if (emptyingTrash) {
    text.push(t('status_bar_emptying_trash_task'));
  }
  if (movingFilesCounter > 0) {
    text.push(t('status_bar_moving_task', { count: movingFilesCounter }));
  }
  if (deletingFilesCounter > 0) {
    text.push(t('status_bar_deleting_task', { count: deletingFilesCounter }));
  }
  if (uploading) {
    text.push(t('uploads:totalUploadingCount', { count: uploadsCounter }));
  }

  if (text.length < 1) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex">
        <icons.Spinner className="mr-1 h-4 w-4 animate-spin text-gray-600 dark:text-zinc-500" />
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

  const totalCount = useSelector((state) => selectListFolderData(state, dirPath)?.ids.length ?? 0);
  const selectionSize = useSelector((state) => selectAllSelectedFileIds(state).size);
  const text =
    selectionSize === 0
      ? t('items_count', { count: totalCount })
      : t('status_bar_select_count', { count: selectionSize, totalCount });

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
    <div className="bottom-0 flex w-full items-center justify-center border-t bg-gray-50 py-1 pl-6 pr-8 text-center text-xs text-gray-400 dark:border-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-500 lg:justify-between">
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
