import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { moveFile, moveFileBatch } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { closeDialog } from '../store/actions/ui';

import { getFilesByIds } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';
import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import pluralize from '../pluralize';
import * as routes from '../routes';

import FolderPicker from '../containers/FolderPicker';

import Dialog from './ui/Dialog';

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
  const files = useSelector((state) => getFilesByIds(state, fileIds));

  const onMove = () => {
    if (files.length === 1) {
      const [file] = files;
      dispatch(moveFile(file.path, routes.join(toPath, file.name)));
    }
    if (files.length > 1) {
      dispatch(moveFileBatch(files.map((file) => ({
        fromPath: file.path,
        toPath: routes.join(toPath, file.name),
      }))));
    }
  };

  const onClose = () => {
    setToPath('.');
    dispatch(closeDialog(uid));
  };

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
          onPathChange={(path) => setToPath(path)}
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
