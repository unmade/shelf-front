import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useMoveFileBatchMutation } from '../../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../../store/tasks';

import * as routes from '../../routes';
import { FileShape } from '../../types';

import Dialog from '../ui-legacy/Dialog';

import FolderPicker from '../FolderPicker';

function MoveDialog({ files, visible, onClose }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [toPath, setToPath] = React.useState('.');

  const [moveFileBatch, { isLoading: loading }] = useMoveFileBatchMutation();

  const onConfirm = async () => {
    const relocations = files.map((file) => ({
      fromPath: file.path,
      toPath: routes.join(toPath, file.name),
    }));

    const {
      data: { taskId },
    } = await moveFileBatch(relocations);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.movingBatch,
        itemsCount: relocations.length,
      }),
    );
    setToPath('.');
    onClose();
  };

  const onCancel = () => {
    onClose();
    setToPath('.');
  };

  const onPathChange = useCallback((path) => setToPath(path), [setToPath]);

  return (
    <Dialog
      title={t('move_dialog_title', { count: files.length })}
      visible={visible}
      confirmTitle={t('Move')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <FolderPicker
        className="flex min-h-[40vh] flex-col sm:w-96"
        emptyTitle={t('Nothing here yet')}
        emptyDescription={t('Press "Move" button to move file here')}
        excludeIds={files.map((file) => file.id)}
        onPathChange={onPathChange}
      />
    </Dialog>
  );
}

MoveDialog.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MoveDialog;
