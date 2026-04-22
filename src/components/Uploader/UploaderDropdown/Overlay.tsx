import { useTranslation } from 'react-i18next';

import type { UploadEntries, UploadScope } from '@/types/uploads';

import { CloudUploadOutlineIcon, UploadIcon } from '@/icons';

import FileDrop from '@/components/FileDrop';

import { UploadButton } from '@/components/Uploader/UploadButton';

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
  dragging: boolean;
  onFilesAdded: (files: UploadEntries) => void;
}

function DropzoneContent({ dragging, onFilesAdded }: DropzoneProps) {
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
    <div className={`${dropzoneClass} ${bg}`}>
      <CloudUploadOutlineIcon className={`h-12 w-12 ${textSecondary}`} />
      <div className="flex flex-col space-y-1 text-center text-sm font-semibold">
        <p className={textPrimary}>{t('uploads:dropzone.title')}</p>
        <p className={textSecondary}>{t('or')}</p>
        <UploadButton onFilesAdded={onFilesAdded}>
          <UploadIcon />
          {t('uploads:uploadButton.title')}
        </UploadButton>
      </div>
    </div>
  );
}

interface Props {
  onFilesAdded: (files: UploadEntries) => void;
  uploadScope: UploadScope;
}

export default function Overlay({ onFilesAdded, uploadScope }: Props) {
  return (
    <div className="text-gray-700 dark:text-gray-200">
      <FileDrop onFilesAdded={onFilesAdded} className="w-full">
        {({ dragging }) => <DropzoneContent dragging={dragging} onFilesAdded={onFilesAdded} />}
      </FileDrop>
      <RecentUploads uploadScope={uploadScope} />
    </div>
  );
}
