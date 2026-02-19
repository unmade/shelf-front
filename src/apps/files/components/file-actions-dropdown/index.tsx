import { useMemo } from 'react';

import { type FileSchema } from '@/store/files';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDeleteImmediatelyAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from '@/hooks/file-actions';

import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';

import SimpleMenuContent from '@/components/SimpleMenuContent';

function useActionGroups(files: FileSchema[]) {
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(files);
  const deleteImmediatelyAction = useDeleteImmediatelyAction(files);
  const downloadAction = useDownloadAction(files);
  const moveAction = useMoveAction(files);
  const renameAction = useRenameAction(files);

  const groups = [
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'moving',
      items: [renameAction, moveAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction, deleteImmediatelyAction].filter((action) => action != null),
    },
  ].filter((group) => group.items.length > 0);

  return useMemo(() => groups, [groups]);
}

interface Props {
  children: React.ReactNode;
  files: FileSchema[];
}

export function FileActionsDropdown({ children, files }: Props) {
  const groups = useActionGroups(files);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} side="bottom" align="end" />
    </DropdownMenu>
  );
}
