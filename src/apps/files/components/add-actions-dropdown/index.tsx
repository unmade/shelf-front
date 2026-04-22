import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import type { UploadEntries } from '@/types/uploads';

import { useAppDispatch } from '@/hooks';

import { fileEntriesAdded } from '@/store/uploads/slice';

import { FolderPlusIcon, PlusIcon, UploadIcon } from '@/icons';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { useUploadFiles } from '@/components/Uploader/hooks/use-upload-files';

import { useCreateFolderDialog } from '@/apps/files/components/dialogs';

interface Props {
  uploadTo: string;
}

export function AddActionsDropdown({ uploadTo }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('files');
  const { openDialog } = useCreateFolderDialog();

  const handleFilesAdded = useCallback(
    (files: UploadEntries) => {
      dispatch(fileEntriesAdded({ files, uploadTo }));
    },
    [dispatch, uploadTo],
  );
  const { triggerUpload, fileInputProps } = useUploadFiles({ onFilesAdded: handleFilesAdded });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PlusIcon />
          {t('addActionsDropdown.label', { defaultValue: 'Add' })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40" side="bottom" align="end">
        <DropdownMenuItem onClick={triggerUpload}>
          <UploadIcon />
          {t('addActionsDropdown.uploadFiles', { defaultValue: 'Upload Files' })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog(uploadTo)}>
          <FolderPlusIcon />
          {t('addActionsDropdown.newFolder', { defaultValue: 'New Folder' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <input {...fileInputProps} />
    </DropdownMenu>
  );
}
