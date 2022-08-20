import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getVisibleUploadsLength } from '../../store/reducers/uploads';

import * as icons from '../../icons';

import ProgressBar from '../ui/ProgressBar';
import Tabs from '../ui/Tabs';

import UploadList from './UploadList';
import UploadListItem from './UploadListItem';

function UploadProgress() {
  const { t } = useTranslation('uploads');

  const allCount = useSelector((state) => getVisibleUploadsLength(state, 'all'));
  const inProgressCount = useSelector((state) => getVisibleUploadsLength(state, 'inProgress'));
  const failedCount = useSelector((state) => getVisibleUploadsLength(state, 'failed'));

  const progress = Math.floor((1 - inProgressCount / (allCount - failedCount)) * 100);

  return (
    <div className="mt-2 space-y-2 border-t-2 pt-4 text-sm font-semibold">
      <div className="flex justify-between">
        {inProgressCount ? (
          <p>{t('uploads:totalUploadingCount', { count: allCount })}</p>
        ) : (
          <p>
            {t('uploads:totalUploadedCount', {
              count: allCount - inProgressCount - failedCount,
              totalCount: allCount,
            })}
          </p>
        )}
        <p>{progress}%</p>
      </div>
      <div>
        <ProgressBar progress={progress} success />
      </div>
    </div>
  );
}

UploadProgress.propTypes = {};

function UploadsPanel({ visibilityFilter }) {
  const { t } = useTranslation('uploads');

  const uploadCount = useSelector((state) => getVisibleUploadsLength(state, visibilityFilter));

  if (uploadCount > 0) {
    return (
      <div>
        <div className="min-h-[30vh] text-xs">
          <UploadList itemRender={UploadListItem} visibilityFilter={visibilityFilter} />
        </div>
        <UploadProgress />
      </div>
    );
  }
  return (
    <div className="flex min-h-[20vh] flex-col items-center justify-center space-y-2 text-gray-600">
      <icons.Collection className="h-6 w-6 text-gray-500" />
      <p className="text-sm">{t('uploads:panel.emptyTitle')}</p>
    </div>
  );
}

UploadsPanel.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
};

function RecentUploads() {
  const { t } = useTranslation('uploads');

  const tabs = [
    {
      name: t('uploads:tab.all.title'),
      visibilityFilter: 'all',
    },
    {
      name: t('uploads:tab.inProgress.title'),
      visibilityFilter: 'inProgress',
    },
    {
      name: t('uploads:tab.failed.title'),
      visibilityFilter: 'failed',
    },
  ];

  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">{t('uploads:title')}</p>

      <Tabs
        size="sm"
        tabs={tabs.map(({ name, visibilityFilter }) => ({
          name,
          render: <UploadsPanel visibilityFilter={visibilityFilter} />,
        }))}
      />
    </div>
  );
}

RecentUploads.propTypes = {};

export default RecentUploads;
