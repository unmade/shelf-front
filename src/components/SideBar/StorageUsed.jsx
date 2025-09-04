import React from 'react';

import { useTranslation } from 'react-i18next';

import { useGetSpaceUsageQuery } from '../../store/accounts';

import * as icons from '../../icons';

import FileSize from '../ui-legacy/FileSize';
import ProgressBar from '../ui-legacy/ProgressBar';

function StorageUsed() {
  const { t } = useTranslation();

  let used = null;
  let quota = null;
  const { data } = useGetSpaceUsageQuery();
  if (data != null) {
    used = data.used;
    quota = data.quota;
  }

  let storageUsed = null;
  if (quota != null) {
    storageUsed = Math.floor(((used ?? 0) / quota) * 100);
  }

  const progress = storageUsed == null ? 100 : storageUsed;
  const idle = storageUsed == null;
  const success = storageUsed != null && storageUsed < 50;
  const warning = storageUsed != null && storageUsed >= 50 && storageUsed < 85;
  const danger = storageUsed != null && storageUsed >= 85;

  return (
    <>
      <div className="space-y-2 text-base/6 font-medium sm:text-sm/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <icons.Database className="h-4 w-4" />
            <p>{t('Storage')}</p>
          </div>
          {(storageUsed != null && (
            <p className="text-gray-400 dark:text-zinc-500">{storageUsed}%</p>
          )) || <icons.Infinite className="h-5 w-5" />}
        </div>
        <ProgressBar
          progress={progress}
          idle={idle}
          success={success}
          warning={warning}
          danger={danger}
        />
        <div className="text-xs text-gray-400 dark:text-zinc-500">
          {quota != null && (
            <>
              <FileSize size={quota - used} /> {t('available')}
            </>
          )}
        </div>
      </div>
    </>
  );
}

StorageUsed.propTypes = {};

export default StorageUsed;
