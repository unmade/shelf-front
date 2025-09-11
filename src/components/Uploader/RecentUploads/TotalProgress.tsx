import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks';

import {
  selectIsUploading,
  selectUploadsTotalProgress,
  selectVisibleUploadsLength,
} from 'store/uploads/slice';

import ProgressBar from 'components/ui/ProgressBar';

export default function TotalProgress() {
  const { t } = useTranslation('uploads');

  const uploading = useAppSelector(selectIsUploading);
  const allCount = useAppSelector((state) => selectVisibleUploadsLength(state, 'all'));
  const failedCount = useAppSelector((state) => selectVisibleUploadsLength(state, 'failed'));

  const progress = useAppSelector(selectUploadsTotalProgress);

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
        <ProgressBar progress={progress} variant="success" />
      </div>
    </div>
  );
}
