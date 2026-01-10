import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Breadcrumbs from '@/components/Breadcrumbs';

import { selectAllSelectedFileIds } from '../../store/browser';
import { Scopes, selectCounterByScope } from '../../store/tasks';
import { selectIsUploading, selectVisibleUploadsLength } from '../../store/uploads/slice';

import { useIsLaptop } from '../../hooks/media-query';

import * as icons from '../../icons';
import { BreadcrumbShape } from '../../types';

import { useBrowserData } from './BrowserDataProvider';

function BackgroundTask({ className }) {
  const { t } = useTranslation(['translation', 'uploads']);

  const deletingFilesCounter = useSelector(
    (state) =>
      selectCounterByScope(state, Scopes.DeletingImmediatelyBatch) +
      selectCounterByScope(state, Scopes.MovingToTrash),
  );
  const emptyingTrash = useSelector(
    (state) => selectCounterByScope(state, Scopes.EmptyingTrash) !== 0,
  );
  const movingFilesCounter = useSelector((state) =>
    selectCounterByScope(state, Scopes.MovingBatch),
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

function TotalFiles({ className }) {
  const { t } = useTranslation();

  const { ids } = useBrowserData();

  const totalCount = ids?.length ?? 0;
  const selectionSize = useSelector((state) => selectAllSelectedFileIds(state).size);
  const text =
    selectionSize === 0
      ? t('items_count', { count: totalCount })
      : t('status_bar_select_count', { count: selectionSize, totalCount });

  return <div className={className}>{text}</div>;
}

TotalFiles.propTypes = {
  className: PropTypes.string,
};

TotalFiles.defaultProps = {
  className: '',
};

function StatusBar({ breadcrumbs }) {
  const isLaptop = useIsLaptop();

  return (
    <div className="bottom-0 flex min-h-[33px] w-full items-center justify-center border-t border-gray-200 bg-gray-50 py-0.5 pr-8 pl-6 text-center text-xs text-gray-400 lg:justify-between dark:border-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-500">
      {isLaptop && <Breadcrumbs className="text-xs" items={breadcrumbs} />}
      <div className="flex">
        <BackgroundTask />
        <TotalFiles className="ml-6" />
      </div>
    </div>
  );
}

export default StatusBar;

StatusBar.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
};
