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

const ActionButton = React.forwardRef(({ item }, ref) => (
  <Button
    innerRef={ref}
    key={item.name}
    variant="text"
    color={item.danger ? 'danger' : 'primary'}
    onClick={(event) => {
      event.stopPropagation();
      item.onClick();
    }}
    full
  >
    <div className="my-1 flex w-full flex-row items-center justify-between whitespace-nowrap">
      <div>{item.name}</div>
      <div className="ml-6">{item.icon}</div>
    </div>
  </Button>
));

function FileTableCellActions({ item }) {
  const groups = useFileActionGroups([item]);
  return (
    <Menu groups={groups} itemRender={ActionButton}>
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
