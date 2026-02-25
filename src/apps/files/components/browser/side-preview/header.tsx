import { useTranslation } from 'react-i18next';

import type { FileSchema } from '@/store/files';

import { MediaType } from '@/constants';
import { cn } from '@/lib/utils';

import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';
import { Text } from '@/ui/text';

import { Thumbnail, ThumbnailSize } from '@/apps/files/components/thumbnail';

const rotations: Record<number, string> = {
  0: 'rotate-6',
  1: '-rotate-6',
  2: 'rotate-0',
};

function SidePreviewTitle({ files }: { files: FileSchema[] }) {
  const { t } = useTranslation();

  if (files.length === 1) {
    return (
      <p
        className={cn(
          'w-full py-1.5 font-semibold wrap-break-word',
          files[0].name.length > 128 ? 'text-sm' : 'text-base',
        )}
      >
        {files[0].name}
      </p>
    );
  }

  return (
    <p className={'w-full py-1.5 font-semibold wrap-break-word'}>
      {t('items_count', { count: files.length })}
    </p>
  );
}

function SidePreviewDescription({ files }: { files: FileSchema[] }) {
  const { t } = useTranslation();

  const folderCount = files.filter((f) => MediaType.isFolder(f.mediatype)).length;
  const fileCount = files.length - folderCount;

  if (files.length === 1) {
    return (
      <Text size="sm">
        <FileSize bytes={files[0].size} />
        <span> • </span>
        <TimeAgo value={files[0].modified_at} />
      </Text>
    );
  }
  return (
    <Text size="sm">
      {countByTypeText(
        t('folders_count', { count: folderCount }),
        t('documents_count', { count: fileCount }),
        folderCount,
        fileCount,
      )}
      <span className="px-1">&bull;</span>
      <FileSize bytes={files.reduce((acc, item) => acc + item.size, 0)} />
    </Text>
  );
}

function countByTypeText(
  folderText: string,
  documentText: string,
  folderCount: number,
  documentCount: number,
) {
  if (documentCount > 0 && folderCount === 0) {
    return documentText;
  }
  if (documentCount === 0 && folderCount > 0) {
    return folderText;
  }
  return `${documentText}, ${folderText}`;
}

interface Props {
  files: FileSchema[];
}

export function SidePreviewHeader({ files }: Props) {
  const previews = files.slice(-3);

  return (
    <div>
      <div className="relative flex h-64 w-full items-center justify-center rounded-md bg-gray-50 p-2 dark:bg-transparent">
        {previews.map((file, idx) => (
          <span
            key={file.id}
            className={cn(
              `absolute transform drop-shadow-xl`,
              idx === previews.length - 1 ? 'rotate-0' : rotations[idx],
            )}
          >
            <Thumbnail className="size-60" size={ThumbnailSize.lg} file={file} />
          </span>
        ))}
      </div>

      <SidePreviewTitle files={files} />
      <SidePreviewDescription files={files} />
    </div>
  );
}
