import { useTranslation } from 'react-i18next';

import type { UploadScope } from '@/types/uploads';

import { LayersIcon } from '@/icons';

import { useAppSelector } from '@/hooks';

import type { UploadsFilter } from '@/store/uploads/slice';
import { selectVisibleUploadsLength } from '@/store/uploads/slice';

import UploadList from '../UploadList';

import TotalProgress from './TotalProgress';

interface Props {
  uploadScope: UploadScope;
  visibilityFilter: UploadsFilter;
}

export default function UploadsPanel({ uploadScope, visibilityFilter }: Props) {
  const { t } = useTranslation('uploads');

  const uploadCount = useAppSelector((state) =>
    selectVisibleUploadsLength(state, visibilityFilter, uploadScope),
  );

  if (uploadCount > 0) {
    return (
      <div>
        <div className="min-h-[30vh] text-xs">
          <UploadList uploadScope={uploadScope} visibilityFilter={visibilityFilter} />
        </div>
        <TotalProgress uploadScope={uploadScope} />
      </div>
    );
  }
  return (
    <div className="flex min-h-[20vh] flex-col items-center justify-center space-y-2 text-gray-600 dark:text-zinc-300">
      <LayersIcon className="h-6 w-6 text-gray-500 dark:text-zinc-400" />
      <p className="text-sm">{t('uploads:panel.emptyTitle')}</p>
    </div>
  );
}
