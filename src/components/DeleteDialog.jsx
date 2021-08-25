import React from 'react';
import PropTypes from 'prop-types';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { moveToTrashBatch } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { makeGetFilesByIds } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import * as icons from '../icons';
import pluralize from '../pluralize';

import Dialog from './ui/Dialog';

function name(files) {
  if (files.length === 1) {
    return files[0].name;
  }
  return `${files.length} ${pluralize('item', files.length)}`;
}

function DeleteDialog({ uid }) {
  const dispatch = useDispatch();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const dialogProps = useSelector((state) => getFileDialogProps(state, { uid }));
  const loading = useSelector((state) => getLoading(state, scopes.movingToTrash));

  const fileIds = dialogProps.fileIds ?? [];
  const getFilesByIds = makeGetFilesByIds();
  const files = useSelector((state) => getFilesByIds(state, { ids: fileIds }), shallowEqual);

  const onDelete = () => {
    dispatch(moveToTrashBatch(files.map((file) => file.path)));
  };

  return (
    <Dialog
      title={`Delete ${files.length} ${pluralize('item', files.length)}`}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle="Delete"
      confirmLoading={loading}
      confirmDanger
      onConfirm={onDelete}
      onCancel={() => dispatch(closeDialog(uid))}
    >
      <p>
        Are you sure you want to move&nbsp;
        <b className="text-gray-700">{name(files)}</b>
        &nbsp;to trash?
      </p>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default DeleteDialog;
