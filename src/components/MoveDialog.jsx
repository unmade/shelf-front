import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { moveFileBatch } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { makeGetFilesByIds } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import pluralize from '../pluralize';
import * as routes from '../routes';

import Dialog from './ui/Dialog';

import FolderPicker from './FolderPicker';

const styles = {
  height: '40vh',
};

function MoveDialog({ uid }) {
  const [toPath, setToPath] = React.useState('.');

  const dispatch = useDispatch();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const dialogProps = useSelector((state) => getFileDialogProps(state, { uid }));
  const loading = useSelector((state) => getLoading(state, scopes.movingFile));

  const fileIds = dialogProps.fileIds ?? [];
  const getFilesByIds = makeGetFilesByIds();
  const files = useSelector((state) => getFilesByIds(state, { ids: fileIds }), shallowEqual);

  const onMove = () => {
    dispatch(moveFileBatch(files.map((file) => ({
      fromPath: file.path,
      toPath: routes.join(toPath, file.name),
    }))));
  };

  const onClose = () => {
    setToPath('.');
    dispatch(closeDialog(uid));
  };

  const onPathChange = useCallback(
    (path) => setToPath(path),
    [setToPath],
  );

  return (
    <Dialog
      title={`Move ${files.length} ${pluralize('item', files.length)} to...`}
      visible={visible}
      confirmTitle="Move"
      confirmLoading={loading}
      onConfirm={onMove}
      onCancel={onClose}
    >
      <div className="w-full sm:w-96" style={styles}>
        <FolderPicker
          path={toPath}
          onPathChange={onPathChange}
          excludeIds={fileIds}
        />
      </div>
    </Dialog>
  );
}

MoveDialog.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default MoveDialog;
