import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

function MoveDialog({ file, onMove, onCancel }) {
  const visible = !!file;
  if (!visible) {
    return null;
  }

  const toPath = '.';
  const onConfirm = () => {
    onMove(file.path, toPath);
    onCancel();
  };

  const type = (file.type === 'folder') ? 'Folder' : 'File';
  return (
    <Dialog
      title={`Move ${type}`}
      visible={visible}
      confirmTitle="Move"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="mt-4 text-sm text-gray-600">
        Select where you want to move&nbsp;
        <b className="text-gray-700">{file.name}</b>
      </p>
    </Dialog>
  );
}

MoveDialog.propTypes = {
  file: PropTypes.shape({
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
