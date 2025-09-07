import { useTranslation } from 'react-i18next';

import { useGetSpaceUsageQuery } from 'store/accounts';

import * as icons from 'icons';

import FileSize from 'components/ui/FileSize';
import ProgressBar from 'components/ui/ProgressBar';
import { Strong, Text } from 'components/ui/Text';

export default function StorageUsed() {
  const { t } = useTranslation();

  const { data } = useGetSpaceUsageQuery(undefined);
  const { used = 0, quota = null } = data ?? {};

  const storageUsed = quota != null && quota > 0 ? Math.floor((used / quota) * 100) : null;

  const progress = storageUsed ?? 100;
  const variant =
    storageUsed == null
      ? 'idle'
      : storageUsed < 50
        ? 'success'
        : storageUsed < 85
          ? 'warning'
          : 'danger';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <icons.Database className="size-5 sm:size-4" />
          <Text>
            <Strong>{t('Storage')}</Strong>
          </Text>
        </div>
        {(storageUsed != null && (
          <Text>
            <Strong>{storageUsed}%</Strong>
          </Text>
        )) || <icons.Infinite className="size-6 sm:size-5" />}
      </div>
      <ProgressBar progress={progress} variant={variant} />
      <p className="text-xs font-medium text-gray-400 dark:text-zinc-500">
        {quota != null && (
          <>
            <FileSize bytes={quota - used} /> {t('available')}
          </>
        )}
      </p>
    </div>
  );
}
