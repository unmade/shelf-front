import React from 'react';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from '../hooks/file-actions';

import * as icons from '../icons';
import { FileShape } from '../types';

import Button from './ui/Button';
import Menu from './ui/Menu';
import MenuItem from './ui/MenuItem';

function useFileActionGroups(files) {
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(files);
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
      items: [deleteAction].filter((action) => action != null),
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}

function FileTableCellActions({ item }) {
  const groups = useFileActionGroups([item]);
  return (
    <Menu panelClassName="min-w-[160px]" groups={groups} itemRenderer={MenuItem}>
      <Button
        as="div"
        variant="text"
        size="lg"
        icon={<icons.MoreOutlined className="h-4 w-4 dark:text-zinc-400" />}
      />
    </Menu>
  );
}

FileTableCellActions.propTypes = {
  item: FileShape.isRequired,
};

export default FileTableCellActions;
