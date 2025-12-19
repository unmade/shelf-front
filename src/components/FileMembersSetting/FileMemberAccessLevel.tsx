import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks';

import { selectCurrentAccount } from '@/store/accounts';
import {
  useRemoveFileMemberMutation,
  useSetFileMemberAccessLevelMutation,
  type FileMemberSchema,
  type FileMemberAccessLevel,
} from '@/store/sharing';

import * as icons from '@/icons';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

function useDisplayAccessLevel(accessLevel: FileMemberAccessLevel): string {
  const { t } = useTranslation('fileMembersSetting');

  switch (accessLevel) {
    case 'owner':
      return t('accessLevel.owner.title', { defaultValue: 'Owner' });
    case 'editor':
      return t('accessLevel.canEdit.title', { defaultValue: 'Can edit' });
    case 'viewer':
      return t('accessLevel.canView.title', { defaultValue: 'Can view' });
    default:
      return accessLevel;
  }
}

interface MemberAccessLevelRadioGroupProps {
  member: FileMemberSchema;
}

function MemberAccessLevelRadioGroup({ member }: MemberAccessLevelRadioGroupProps) {
  const { t } = useTranslation('fileMembersSetting');

  const [setMemberAccessLevel] = useSetFileMemberAccessLevelMutation();

  const account = useAppSelector((state) => selectCurrentAccount(state));
  const isCurrentUser = account?.id === member.id;
  const { access_level: accessLevel, permissions } = member;
  const { can_change_access_level: canChangeAccessLevel } = permissions;

  const handleSetMemberAccessLevel = async (newAccessLevel: FileMemberAccessLevel) => {
    const { id: memberId, file_id: fileId } = member;
    if (newAccessLevel !== accessLevel) {
      try {
        await setMemberAccessLevel({ fileId, memberId, accessLevel: newAccessLevel }).unwrap();
      } catch {
        // TODO: show toast on error
      }
    }
  };

  return (
    <DropdownMenuRadioGroup
      value={accessLevel}
      onValueChange={(value) => handleSetMemberAccessLevel(value as FileMemberAccessLevel)}
    >
      <DropdownMenuRadioItem value="viewer" disabled={isCurrentUser || !canChangeAccessLevel}>
        {t('accessLevel.canView.title', { defaultValue: 'Can view' })}
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="editor" disabled={isCurrentUser || !canChangeAccessLevel}>
        {t('accessLevel.canEdit.title', { defaultValue: 'Can edit' })}
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}

interface Props {
  member: FileMemberSchema;
}

export default function FileMemberAccessLevel({ member }: Props) {
  const { t } = useTranslation('fileMembersSetting');

  const [removeMember] = useRemoveFileMemberMutation();

  const displayAccessLevel = useDisplayAccessLevel(member.access_level);

  const handleRemoveMember = async () => {
    const { id: memberId, file_id: fileId } = member;
    try {
      await removeMember({ fileId, memberId }).unwrap();
    } catch {
      // TODO: show toast on error
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" disabled={member.access_level === 'owner'}>
          {displayAccessLevel}
          <icons.ChevronDown className="ml-1 inline h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48" side="bottom" align="end">
        <DropdownMenuLabel>
          {t('accessLevel.label', { defaultValue: 'Access Level' })}
        </DropdownMenuLabel>
        <MemberAccessLevelRadioGroup member={member} />
        <DropdownMenuSeparator />
        {member.permissions.can_remove && (
          <DropdownMenuItem variant="destructive" onSelect={handleRemoveMember}>
            {t('removeMemberBtn.title', { defaultValue: 'Remove' })}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
