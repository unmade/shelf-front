import { useTranslation } from 'react-i18next';

import * as Collapsible from '@radix-ui/react-collapsible';

import { type SharedLinkFileSchema, downloadSharedLinkFile } from '@/store/sharedLinks';

import { useAppDispatch } from '@/hooks';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { FileSize } from '@/ui/filesize';
import { Text } from '@/ui/text';
import { TimeAgo } from '@/ui/timeago';

interface PropertyProps {
  label: string;
  value: React.ReactNode;
}

function Property({ label, value }: PropertyProps) {
  return (
    <div className="flex items-start justify-between py-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="max-w-2/3 truncate text-right text-xs">{value}</span>
    </div>
  );
}

function DownloadButton({ token, filename }: { token: string; filename: string }) {
  const { t } = useTranslation('files');
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(downloadSharedLinkFile({ token, filename }))}>
      {t('actions.download', { defaultValue: 'Download' })}
    </Button>
  );
}

interface SidePanelContentProps {
  file: SharedLinkFileSchema;
  token: string;
}

function SidePanelContent({ file, token }: SidePanelContentProps) {
  const { t } = useTranslation('files');

  return (
    <div className="h-full w-full border-l">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <p
            className={cn(
              'w-full py-1.5 font-semibold wrap-break-word',
              file.name.length > 128 ? 'text-sm' : 'text-base',
            )}
          >
            {file.name}
          </p>
          <Text size="sm">
            <TimeAgo value={file.modified_at} />
          </Text>
        </div>
        <DownloadButton token={token} filename={file.name} />
        <div>
          <p className="text-sm font-medium uppercase">
            {t('sections.information', { defaultValue: 'Information' })}
          </p>
          <div className="space-y-0.5">
            <Property
              label={t('properties.size', { defaultValue: 'Size' })}
              value={<FileSize bytes={file.size} />}
            />
            <Property
              label={t('properties.modified', { defaultValue: 'Modified' })}
              value={<TimeAgo value={file.modified_at} format="LLL" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  file: SharedLinkFileSchema;
  token: string;
  open: boolean;
}

export function SharedLinkSidePanel({ file, token, open }: Props) {
  return (
    <Collapsible.Root
      open={open}
      className={[
        'hidden h-full lg:block lg:w-xs xl:w-sm',
        'transform transition-all duration-300',
        'data-[state=closed]:pointer-events-none',
        'data-[state=closed]:w-0',
        'data-[state=closed]:translate-x-full',
      ].join(' ')}
    >
      <Collapsible.Content forceMount className="h-full overflow-hidden dark:bg-zinc-900">
        <SidePanelContent file={file} token={token} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
