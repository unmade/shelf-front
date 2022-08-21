import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUploaderTotalProgress } from '../../store/reducers/ui';
import { getIsUploading, getVisibleUploadsLength } from '../../store/reducers/uploads';

import ProgressBar from '../ui/ProgressBar';

function TotalProgress() {
  const { t } = useTranslation('uploads');

  const uploading = useSelector(getIsUploading);
  const allCount = useSelector((state) => getVisibleUploadsLength(state, 'all'));
  const failedCount = useSelector((state) => getVisibleUploadsLength(state, 'failed'));

  const progress = useSelector(getUploaderTotalProgress);

  return (
    <div className="mt-2 space-y-2 border-t-2 pt-4 text-sm font-semibold">
      <div className="flex justify-between">
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
