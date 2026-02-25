import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import { selectFilesSharedViaLinkById, useRevokeSharedLinkMutation } from '@/store/sharedLinks';

import { useAppSelector } from '@/hooks';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { useCopyLinkDialog } from '@/components/CopyLinkDialogProvider';

interface Props {
  children: React.ReactNode;
  fileId: string;
}

export function ActionsDropdown({ children, fileId }: Props) {
  const { t } = useTranslation('sharedViaLink');
  const { openDialog } = useCopyLinkDialog();
  const [revokeSharedLink] = useRevokeSharedLinkMutation();
  const file = useAppSelector((state) => selectFilesSharedViaLinkById(state, fileId));

  if (!file) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40" side="bottom" align="end">
        <DropdownMenuItem onClick={() => openDialog(file)}>
          <icons.LinkOutlined />
          {t('configureLink', { defaultValue: 'Configure link' })}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => revokeSharedLink({ fileId: file.id, token: file.token })}
        >
          <icons.TrashOutlined />
          {t('removeSharedLink', { defaultValue: 'Remove shared link' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
