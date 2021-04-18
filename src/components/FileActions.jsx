import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import ActionsMenu from './ActionsMenu';

function FileActions({
  fileId, filePath, onRename, onMove, onDelete, onDownload,
}) {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download className="w-4 h-4" />,
      danger: false,
      onClick: () => { onDownload(filePath); },
    },
    {
      name: 'Rename',
      icon: <icons.ICursor className="w-4 h-4" />,
      danger: false,
      onClick: () => { onRename(fileId); },
    },
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      danger: false,
      onClick: () => { onMove(fileId); },
    },
    {
      name: 'Delete',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => { onDelete(fileId); },
    },
  ];

  return <ActionsMenu menu={menu} />;
}

FileActions.propTypes = {
  fileId: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FileActions;
