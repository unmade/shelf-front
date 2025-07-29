import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import type { UploadsFilter } from 'store/uploads/slice';
import { selectVisibleUploadsLength } from 'store/uploads/slice';

import UploadList from '../UploadList';

import TotalProgress from './TotalProgress';

interface Props {
  visibilityFilter: UploadsFilter;
}

export default function UploadsPanel({ visibilityFilter }: Props) {
  const { t } = useTranslation('uploads');

  const uploadCount = useAppSelector((state) =>
    selectVisibleUploadsLength(state, visibilityFilter),
  );

  if (uploadCount > 0) {
    return (
      <div>
        <div className="min-h-[30vh] text-xs">
          <UploadList visibilityFilter={visibilityFilter} />
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
