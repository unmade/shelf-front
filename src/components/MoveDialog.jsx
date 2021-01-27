import React from 'react';
import PropTypes from 'prop-types';

import { FileType } from '../constants';

import FolderPicker from '../containers/FolderPicker';

import Dialog from './Dialog';

function MoveDialog({ file, onMove, onCancel }) {
  const [toPath, setToPath] = React.useState('.');
  const visible = !!file;
  if (!visible) {
    return null;
  }

  const onConfirm = () => {
    // this is certainly not a safe way to concat paths
    onMove(file.path, `${toPath}/${file.name}`);
    onCancel();
  };

  const onPathChange = (path) => {
    setToPath(path);
  };

  const type = (file.type === FileType.FILE) ? 'File' : 'Folder';
  return (
    <Dialog
      title={`Move ${type}`}
      visible={visible}
      confirmTitle="Move"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <div className="my-4" style={{ minWidth: '350px', height: '40vh' }}>
        <FolderPicker path={toPath} onPathChange={onPathChange} />
      </div>
    </Dialog>
  );
}

MoveDialog.propTypes = {
  file: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  onMove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

MoveDialog.defaultProps = {
  file: null,
};

export default MoveDialog;
