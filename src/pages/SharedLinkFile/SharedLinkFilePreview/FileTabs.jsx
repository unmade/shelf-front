import { useTranslation } from 'react-i18next';

import { SharedLinkFileShape } from '@/types';

import { cn } from '@/lib/utils';

import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

function Property({ className = '', label, value }) {
  return (
    <div className={cn('flex items-start justify-between py-1', className)}>
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="max-w-2/3 truncate text-right text-xs">{value}</span>
    </div>
  );
}

function InfoSection({ file }) {
  return (
    <div className="space-y-0.5">
      {<Property label="Size" value={<FileSize bytes={file.size} />} />}
      <Property label="Modified" value={<TimeAgo value={file.modified_at} format="LLL" />} />
    </div>
  );
}

function FileTabs({ file }) {
  const { t } = useTranslation('file');

  return (
    <div>
      <p className="text-sm font-medium uppercase">{t('file:information')}</p>
      <InfoSection file={file} />
    </div>
  );
}

export default FileTabs;
