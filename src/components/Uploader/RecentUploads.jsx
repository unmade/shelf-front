import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectVisibleUploadsLength } from '../../store/uploads';

import * as icons from '../../icons';

import Tabs from '../ui/Tabs';

import TotalProgress from './TotalProgress';
import UploadList from './UploadList';
import UploadListItem from './UploadListItem';

function UploadsPanel({ visibilityFilter }) {
  const { t } = useTranslation('uploads');

  const uploadCount = useSelector((state) => selectVisibleUploadsLength(state, visibilityFilter));

  if (uploadCount > 0) {
    return (
      <div>
        <div className="min-h-[30vh] text-xs">
          <UploadList itemRender={UploadListItem} visibilityFilter={visibilityFilter} />
        </div>
        <TotalProgress />
      </div>
    );
  }
  return (
    <div className="flex min-h-[20vh] flex-col items-center justify-center space-y-2 text-gray-600 dark:text-zinc-300">
      <icons.Collection className="h-6 w-6 text-gray-500 dark:text-zinc-400" />
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
