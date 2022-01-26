import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { moveToTrashBatch } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { getFilesByIds } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import * as icons from '../icons';

import Dialog from './ui/Dialog';

function DeleteDialog({ uid }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const dialogProps = useSelector((state) => getFileDialogProps(state, { uid }));
  const loading = useSelector((state) => getLoading(state, scopes.movingToTrash));

  const fileIds = dialogProps.fileIds ?? [];
  const files = useSelector((state) => getFilesByIds(state, { ids: fileIds }), shallowEqual);

  const onDelete = () => {
    dispatch(moveToTrashBatch(files.map((file) => file.path)));
  };

  const count = files.length;
  const fileName = files[0]?.name;

  const dialogText =
    files.length === 1 ? (
      <Trans i18nKey="delete_dialog_text" t={t} fileName={fileName}>
        Are you sure you want to move
        <b className="text-gray-700">{{ fileName }}</b>
        to trash?
      </Trans>
    ) : (
      <Trans i18nKey="delete_dialog_batch_text" t={t} count={count}>
        Are you sure you want to move
        <b className="text-gray-700">{{ count }}</b>
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
      onConfirm={onDelete}
      onCancel={() => dispatch(closeDialog(uid))}
    >
      <p>{dialogText}</p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default DeleteDialog;
