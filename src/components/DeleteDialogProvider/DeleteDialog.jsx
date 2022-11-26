import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useMoveToTrashBatchMutation } from '../../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../../store/tasks';

import * as icons from '../../icons';
import { FileShape } from '../../types';

import Dialog from '../ui/Dialog';

function DeleteDialog({ files, visible, onClose }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [moveToTrashBatch, { isLoading: loading }] = useMoveToTrashBatchMutation();

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
    onClose();
  };

  const onCancel = () => {
    onClose();
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
  files: PropTypes.arrayOf(FileShape).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteDialog;
