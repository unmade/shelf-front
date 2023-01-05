import React from 'react';
import PropTypes from 'prop-types';

import {
  useDeleteAction,
  useDownloadAction,
  useMoveAction,
  useRenameAction,
} from '../../hooks/file-actions';

import { FileShape } from '../../types';

import Button from '../ui/Button';

function useFileActions(files) {
  const deleteAction = useDeleteAction(files);
  const downloadAction = useDownloadAction(files);
  const moveAction = useMoveAction(files);
  const renameAction = useRenameAction(files);

  const actions = [downloadAction, renameAction, moveAction, deleteAction];
  return actions.filter((action) => action != null);
}

function SidePreviewActions({ files }) {
  const menu = useFileActions(files);
  return (
    <>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          size="lg"
          icon={item.icon}
          title={item.name}
          danger={item.danger}
          onClick={item.onClick}
        />
      ))}
    </>
  );
}

SidePreviewActions.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
};

export default SidePreviewActions;
