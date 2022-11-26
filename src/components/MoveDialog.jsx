import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { selectCurrentPath } from '../store/browser';
import { selectFileByIdInPath, useMoveFileBatchMutation } from '../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../store/tasks';

import { fileDialogClosed } from '../store/actions/ui';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import * as routes from '../routes';

import Dialog from './ui/Dialog';

import FolderPicker from './FolderPicker';

const styles = {
  height: '40vh',
};

function MoveDialog({ uid }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [toPath, setToPath] = React.useState('.');

  const [moveFileBatch, { isLoading: loading }] = useMoveFileBatchMutation();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const dialogProps = useSelector((state) => getFileDialogProps(state, { uid }));

  const fileIds = dialogProps.fileIds ?? [];
  const currentPath = useSelector(selectCurrentPath);
  const files = useSelector(
    (state) => fileIds.map((id) => selectFileByIdInPath(state, { path: currentPath, id })),
    shallowEqual
  );

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
      })
    );
    dispatch(fileDialogClosed(uid));
  };

  const onCancel = () => {
    setToPath('.');
    dispatch(fileDialogClosed(uid));
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
      <div className="w-full sm:w-96" style={styles}>
        <FolderPicker
          emptyTitle={t('Nothing here yet')}
          emptyDescription={t('Press "Move" button to move file here')}
          excludeIds={fileIds}
          onPathChange={onPathChange}
          onlyFolders
        />
      </div>
    </Dialog>
  );
}

MoveDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default MoveDialog;
