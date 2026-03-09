import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { useFileMembersDialog } from '@/apps/files/components/dialogs';

interface Props {
  children: React.ReactNode;
  fileId: string;
}

export function ActionsDropdown({ children, fileId }: Props) {
  const { t } = useTranslation('files');
  const { openDialog } = useFileMembersDialog();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40" side="bottom" align="end">
        <DropdownMenuItem onClick={() => openDialog(fileId)}>
          <icons.UsersOutlined />
          {t('sharedInApp.manageMembers', { defaultValue: 'Manage members' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
