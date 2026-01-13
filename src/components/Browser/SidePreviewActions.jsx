import React from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes';

import {
  useDeleteAction,
  useDeleteImmediatelyAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from 'hooks/file-actions';

import { FileShape } from 'types';

import { Button } from '@/ui/button';

function useTrashedFileActions(files) {
  const moveAction = useMoveAction(files);
  const deleteImmediatelyAction = useDeleteImmediatelyAction(files);

  const actions = [moveAction, deleteImmediatelyAction];
  return actions.filter((action) => action != null);
}

function useFileActions(files) {
  const deleteAction = useDeleteAction(files);
  const downloadAction = useDownloadAction(files);
  const moveAction = useMoveAction(files);
  const renameAction = useRenameAction(files);

  const actions = [downloadAction, renameAction, moveAction, deleteAction];
  return actions.filter((action) => action != null);
}

function FileMenu({ menu }) {
  return (
    <>
      {menu.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="icon"
          title={item.name}
          onClick={item.onClick}
        >
          {item.icon}
        </Button>
      ))}
    </>
  );
}

function TrashedFileActions({ files }) {
  const menu = useTrashedFileActions(files);
  return <FileMenu menu={menu} />;
}

function FileActions({ files }) {
  const menu = useFileActions(files);
  return <FileMenu menu={menu} />;
}

function SidePreviewActions({ files }) {
  if (files.length === 0) {
    return null;
  }
  const trashedFiles = files.filter((file) => routes.isTrashed(file.path));
  if (trashedFiles.length) {
    return <TrashedFileActions files={files} />;
  }
  return <FileActions files={files} />;
}

SidePreviewActions.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
};

export default SidePreviewActions;
