import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { useMoveFileBatchMutation } from '../../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../../store/tasks';

import { FileShape } from '../../types';

import RenameFileDialog from './RenameFileDialog';

function RenameFileDialogContainer({ file, visible, onClose }) {
  const dispatch = useDispatch();

  const [moveFileBatch, { isLoading: loading }] = useMoveFileBatchMutation();

  const onRename = async (fromPath, toPath) => {
    const relocations = [{ fromPath, toPath }];

    const {
      data: { taskId },
    } = await moveFileBatch(relocations);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.movingBatch,
        itemsCount: relocations.length,
      })
    );
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <RenameFileDialog
      file={file}
      visible={visible}
      loading={loading}
      onRename={onRename}
      onCancel={onCancel}
    />
  );
}

RenameFileDialogContainer.propTypes = {
  file: FileShape,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

RenameFileDialogContainer.defaultProps = {
  file: null,
};

export default RenameFileDialogContainer;
