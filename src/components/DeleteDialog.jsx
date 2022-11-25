import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { selectFileByIdInPath, useMoveToTrashBatchMutation } from '../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../store/tasks';

import { fileDialogClosed } from '../store/actions/ui';
import { getCurrentPath, getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteDialog({ uid }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const dialogProps = useSelector((state) => getFileDialogProps(state, { uid }));

  const [moveToTrashBatch, { isLoading: loading }] = useMoveToTrashBatchMutation();

  const fileIds = dialogProps.fileIds ?? [];
  const path = useSelector(getCurrentPath);
  const files = useSelector(
    (state) => fileIds.map((id) => selectFileByIdInPath(state, { path, id })),
    shallowEqual
  );

  const onConfirm = async () => {
    const paths = files.map((file) => file.path);
    const {
      data: { taskId },
    } = await moveToTrashBatch(paths);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.movingToTrash,
        itemsCount: paths.length,
      })
    );
    dispatch(fileDialogClosed(uid));
  };

  const onCancel = () => {
    dispatch(fileDialogClosed(uid));
  };

  const count = files.length;
  const fileName = files[0]?.name;

  const dialogText =
    files.length === 1 ? (
      <Trans i18nKey="delete_dialog_text" t={t} fileName={fileName}>
        Are you sure you want to move
        <b className="text-gray-700 dark:text-zinc-200">{{ fileName }}</b>
        to trash?
      </Trans>
    ) : (
      <Trans i18nKey="delete_dialog_batch_text" t={t} count={count}>
        Are you sure you want to move
        <b className="text-gray-700 dark:text-zinc-200">{{ count }}</b>
        to trash?
      </Trans>
    );

  return (
    <Dialog
      title={t('delete_dialog_title', { count: files.length })}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Delete')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p>{dialogText}</p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default DeleteDialog;
