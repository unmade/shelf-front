import React from 'react';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDeleteImmediatelyAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from 'hooks/file-actions';

import * as icons from 'icons';
import * as routes from 'routes';
import { FileShape } from 'types';

import Button from 'components/ui/Button';
import Menu from 'components/ui/Menu';

function useTrashedFileActionGroups(files) {
  const moveAction = useMoveAction(files);
  const deleteImmediatelyAction = useDeleteImmediatelyAction(files);

  const actions = [
    {
      key: 'deleting',
      items: [moveAction, deleteImmediatelyAction],
    },
  ];
  return actions.filter((action) => action.items.length != null);
}

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

function FileMenu({ groups }) {
  return (
    <Menu sections={groups}>
      <Button as="div" variant="plain" color="gray">
        <icons.MoreOutlined data-slot="icon" />
      </Button>
    </Menu>
  );
}

function TrashedFileActions({ item }) {
  const groups = useTrashedFileActionGroups([item]);
  return <FileMenu groups={groups} />;
}

function FileActions({ item }) {
  const groups = useFileActionGroups([item]);
  return <FileMenu groups={groups} />;
}

function FileTableCellActions({ item }) {
  if (routes.isTrashed(item.path)) {
    return <TrashedFileActions item={item} />;
  }
  return <FileActions item={item} />;
}

FileTableCellActions.propTypes = {
  item: FileShape.isRequired,
};

export default FileTableCellActions;
