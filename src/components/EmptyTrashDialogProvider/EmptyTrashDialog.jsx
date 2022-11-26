import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useEmptyTrashMutation } from '../../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../../store/tasks';

import * as icons from '../../icons';

import Dialog from '../ui/Dialog';

function EmptyTrashDialog({ visible, onClose }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [emptyTrash, { isLoading: loading }] = useEmptyTrashMutation();

  const onConfirm = async () => {
    const {
      data: { taskId },
    } = await emptyTrash();
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.emptyingTrash,
        itemsCount: 1,
      })
    );
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Dialog
      title={t('Empty Trash')}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Empty')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p>
        <Trans i18nKey="empty_trash_dialog_text_styled" t={t}>
          Are you sure you want to delete
          <b className="text-gray-700 dark:text-zinc-200">all</b>
          files in the Trash?
        </Trans>
      </p>
    </Dialog>
  );
}

EmptyTrashDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmptyTrashDialog;
