import React from 'react';

import { useTranslation } from 'react-i18next';

import { UploadsFilter } from 'store/uploads/slice';

import Tabs from 'components/ui/Tabs';

import UploadsPanel from './UploadsPanel';

export default function RecentUploads() {
  const { t } = useTranslation('uploads');

  const tabs: { name: string; visibilityFilter: UploadsFilter }[] = [
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
          renderer: <UploadsPanel visibilityFilter={visibilityFilter} />,
        }))}
      />
    </div>
  );
}
