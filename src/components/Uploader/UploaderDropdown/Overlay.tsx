import type { RefObject } from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import FileDrop from 'components/FileDrop';

import UploadButton from 'components/UploadButton';

import RecentUploads from '../RecentUploads';

const dropzoneClass = [
  'p-4',
  'border-2',
  'border-dashed',
  'rounded-xl',
  'flex',
  'flex-row',
  'items-center',
  'justify-center',
  'space-x-6',
  'transition',
  'ease-in',
  'duration-75',
].join(' ');

interface DropzoneProps {
  allowedMediaTypes?: string[];
  dragging: boolean;
  innerRef: RefObject<HTMLDivElement>;
  uploadTo: string;
}

function Dropzone({ allowedMediaTypes, dragging, innerRef, uploadTo }: DropzoneProps) {
  const { t } = useTranslation(['translation', 'uploads']);

  let bg;
  let textPrimary;
  let textSecondary;
  if (dragging) {
    bg = 'border-teal-200 bg-teal-50 dark:border-teal-700 dark:bg-teal-700/30';
    textPrimary = 'text-teal-700 dark:text-teal-400';
    textSecondary = 'text-teal-600 dark:text-teal-500';
  } else {
    bg = 'bg-gray-50 dark:bg-zinc-700/30 border-gray-200 dark:border-zinc-700';
    textPrimary = 'text-gray-600 dark:text-zinc-300';
    textSecondary = 'text-gray-400 dark:text-zinc-500';
  }
  return (
    <div ref={innerRef} className={`${dropzoneClass} ${bg}`}>
      <icons.CloudUploadOutlined className={`h-12 w-12 ${textSecondary}`} />
      <div className="flex flex-col space-y-1 text-center text-sm font-semibold">
        <p className={textPrimary}>{t('uploads:dropzone.title')}</p>
        <p className={textSecondary}>{t('or')}</p>
        <UploadButton
          allowedMediaTypes={allowedMediaTypes}
          uploadTo={uploadTo}
          icon={<icons.Upload />}
        >
          {t('uploads:uploadButton.title')}
        </UploadButton>
      </div>
    </div>
  );
}

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function Overlay({ allowedMediaTypes, uploadTo }: Props) {
  return (
    <div className="w-96 rounded-2xl bg-white p-4 text-gray-700 shadow dark:bg-zinc-800 dark:text-gray-200 dark:shadow-zinc-900/70">
      <FileDrop
        allowedMediaTypes={allowedMediaTypes}
        uploadTo={uploadTo}
        className="w-full"
        render={({ innerRef, dragging }) => (
          <Dropzone
            allowedMediaTypes={allowedMediaTypes}
            innerRef={innerRef}
            dragging={dragging}
            uploadTo={uploadTo}
          />
        )}
      />
      <RecentUploads />
    </div>
  );
}
