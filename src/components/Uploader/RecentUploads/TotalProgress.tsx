import { useTranslation } from 'react-i18next';

import type { UploadScope } from '@/types/uploads';

import { useAppSelector } from '@/hooks';

import {
  selectIsUploading,
  selectUploadsTotalProgress,
  selectVisibleUploadsLength,
} from '@/store/uploads/slice';

import { Progress } from '@/ui/progress';

interface Props {
  uploadScope: UploadScope;
}

export default function TotalProgress({ uploadScope }: Props) {
  const { t } = useTranslation('uploads');

  const uploading = useAppSelector((state) => selectIsUploading(state, uploadScope));
  const allCount = useAppSelector((state) => selectVisibleUploadsLength(state, 'all', uploadScope));
  const failedCount = useAppSelector((state) =>
    selectVisibleUploadsLength(state, 'failed', uploadScope),
  );

  const progress = useAppSelector((state) =>
    selectUploadsTotalProgress(state, { scope: uploadScope }),
  );

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
        <Progress progress={progress} variant="success" />
      </div>
    </div>
  );
}
