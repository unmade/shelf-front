import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectAllSelectedFileIds } from '../../store/browser';
import { scopes, selectCounterByScope } from '../../store/tasks';
import { selectIsUploading, selectVisibleUploadsLength } from '../../store/uploads/slice';

import { useIsLaptop } from '../../hooks/media-query';

import * as icons from '../../icons';
import { BreadcrumbShape } from '../../types';

import Breadcrumb from '../ui/Breadcrumb';

import { useBrowserData } from './BrowserDataProvider';

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

const iconsByPath = {
  '.': icons.Home,
  trash: icons.Trash,
};

function BreadcrumbItem({ name, url, path }) {
  const Icon = iconsByPath[path];
  return (
    <Breadcrumb.Item to={url}>
      <span className="flex max-w-2xs items-center truncate">
        {Icon && (
          <span className="py-2 sm:py-1">
            <Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
          </span>
        )}
        <span className="block truncate">{name}</span>
      </span>
    </Breadcrumb.Item>
  );
}

function BreadcrumbItemCollapsed({ name, url }) {
  return (
    <Breadcrumb.Item to={url}>
      <span className="flex max-w-xs items-center">
        <span className="py-2 sm:py-1">
          <icons.Folder className="mr-2 h-5 w-5 shrink-0 text-blue-400" />
        </span>
        <span className="block truncate">{name}</span>
      </span>
    </Breadcrumb.Item>
  );
}

function StatusBar({ breadcrumbs }) {
  const isLaptop = useIsLaptop();

  return (
    <div className="bottom-0 flex min-h-[33px] w-full items-center justify-center border-t bg-gray-50 py-0.5 pl-6 pr-8 text-center text-xs text-gray-400 dark:border-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-500 lg:justify-between">
      {isLaptop && (
        <Breadcrumb
          items={breadcrumbs}
          itemRenderer={BreadcrumbItem}
          itemRendererCollapsed={BreadcrumbItemCollapsed}
        />
      )}
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
