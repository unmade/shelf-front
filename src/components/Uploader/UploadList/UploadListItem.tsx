import React from 'react';

import type { IUploadError } from 'types/files';

import { useAppSelector } from 'hooks';

import { selectUploadById } from 'store/uploads/slice';

import useUploadError from './hooks/upload-error';

import UploadThumbnail from './UploadThumbnail';
import Progress from './UploadListItemProgress';

const textColors = {
  completed: {
    primary: 'text-teal-700 dark:text-teal-300',
    secondary: 'text-teal-600 dark:text-teal-400',
  },
  failed: {
    primary: 'text-red-700 dark:text-rose-300',
    secondary: 'text-red-600 dark:text-rose-400',
  },
  inProgress: {
    primary: 'text-gray-600 dark:text-zinc-300',
    secondary: 'text-gray-500 dark:text-zinc-400',
  },
};

const bgColors = {
  completed: 'bg-teal-400/25 dark:bg-teal-500/25',
  failed: 'bg-red-400/25 dark:bg-rose-500/25',
  inProgress: 'bg-blue-400/25 dark:bg-blue-500/25',
};

function getStatus({ error, done }: { error: IUploadError | null; done: boolean }) {
  if (error != null) {
    return 'failed';
  }
  if (done) {
    return 'completed';
  }
  return 'inProgress';
}

interface UploadListItemProps {
  uploadId: string;
  style: React.CSSProperties;
}

function UploadListItem({ uploadId, style }: UploadListItemProps) {
  const item = useAppSelector((state) => selectUploadById(state, uploadId));

  const { id, name, parentPath, progress, error, done } = item;

  const fillerStyles = {
    height: 'calc(100% - 0.25rem)',
    width: `${error ? '100' : progress}%`,
    transition: 'width 0.3s ease-in-out',
  };

  const status = getStatus({ error, done });
  const errorText = useUploadError(error?.code);
  const textColor = textColors[status];
  const bgColor = bgColors[status];

  return (
    <div style={style}>
      <div className="flex h-full flex-row items-center space-x-4 py-2">
        <div style={fillerStyles} className={`absolute rounded-lg ${bgColor}`} />
        <div className="z-10">
          <UploadThumbnail className={`${textColor.secondary} h-12 w-12`} uploadId={id} />
        </div>

        <div className="z-10 flex w-full min-w-0 flex-col">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className={`flex min-w-0 flex-col ${textColor.primary}`}>
              <p className="truncate font-semibold">{name}</p>
              <p className={`truncate ${textColor.secondary}`}>{errorText ?? parentPath}</p>
            </div>

            <div className="text-right text-sm">
              <Progress className={textColor.secondary} status={status} progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UploadListItemContainerProps {
  data: string[];
  index: number;
  style: React.CSSProperties;
}

function UploadListItemContainer({ data, index, style }: UploadListItemContainerProps) {
  return <UploadListItem uploadId={data[index]} style={style} />;
}

export default React.memo(UploadListItemContainer);
