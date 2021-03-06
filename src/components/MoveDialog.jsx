import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';
import * as routes from '../routes';

import FolderPicker from '../containers/FolderPicker';

import Dialog from './ui/Dialog';

const styles = {
  height: '40vh',
};

function MoveDialog({
  file, loading, uid, visible, onMove, onCancel,
}) {
  const [toPath, setToPath] = React.useState('.');
  const type = (file && file.mediatype === MediaType.FOLDER) ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Move ${type}`}
      visible={visible}
      confirmTitle="Move"
      confirmLoading={loading}
      onConfirm={() => onMove(file.path, routes.join(toPath, file.name))}
      onCancel={() => onCancel(uid)}
    >
      <div className="w-full sm:w-96" style={styles}>
        <FolderPicker
          path={toPath}
          onPathChange={(path) => setToPath(path)}
          excludeId={file && file.id}
        />
      </div>
    </Dialog>
  );
}

MoveDialog.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onMove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

MoveDialog.defaultProps = {
  file: null,
  loading: false,
  visible: false,
};

export default MoveDialog;
