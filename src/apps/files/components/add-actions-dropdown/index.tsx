import { useTranslation } from 'react-i18next';

import { FolderPlusIcon, PlusIcon, UploadIcon } from '@/icons';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { useCreateFolderDialog } from '@/apps/files/components/dialogs';
import { useUploadFiles } from '@/apps/files/hooks/use-upload-files';

interface Props {
  uploadTo: string;
}

export function AddActionsDropdown({ uploadTo }: Props) {
  const { t } = useTranslation('files');
  const { openDialog } = useCreateFolderDialog();
  const { triggerUpload, fileInputProps } = useUploadFiles({ uploadTo });

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
