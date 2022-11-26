import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  selectIsUploading,
  selectUploadsTotalProgress,
  selectVisibleUploadsLength,
} from '../../store/uploads';

import ProgressBar from '../ui/ProgressBar';

function TotalProgress() {
  const { t } = useTranslation('uploads');

  const uploading = useSelector(selectIsUploading);
  const allCount = useSelector((state) => selectVisibleUploadsLength(state, 'all'));
  const failedCount = useSelector((state) => selectVisibleUploadsLength(state, 'failed'));

  const progress = useSelector(selectUploadsTotalProgress);

  return (
    <div className="mt-2 space-y-2 border-t-2 pt-4 text-sm font-semibold dark:border-zinc-700">
      <div className="flex justify-between dark:text-zinc-200">
        {uploading ? (
          <p>{t('uploads:totalUploadingCount', { count: allCount })}</p>
        ) : (
          <p>
            {t('uploads:totalUploadedCount', {
              count: allCount - failedCount,
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

TotalProgress.propTypes = {};

export default TotalProgress;
