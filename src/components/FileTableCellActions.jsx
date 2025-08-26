import React from 'react';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDeleteImmediatelyAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from 'hooks/file-actions';

import { MoreOutlined } from 'icons';
import * as routes from 'routes';
import { FileShape } from 'types';

import { Dropdown, DropdownButton } from 'components/ui/DropdownMenu';

import SimpleMenu from 'components/SimpleMenu';

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

const stopPropagation = (event) => {
  event.stopPropagation();
};

function FileMenu({ groups }) {
  return (
    <Dropdown>
      <DropdownButton
        className="focus:outline-none"
        variant="plain"
        color="gray"
        onClick={stopPropagation}
      >
        <MoreOutlined data-slot="icon" />
      </DropdownButton>
      <SimpleMenu sections={groups} />
    </Dropdown>
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
