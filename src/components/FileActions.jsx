import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import ActionsMenu from './ActionsMenu';

function FileActions({
  closeOverlay, fileId, filePath, onRename, onMove, onDelete, onDownload,
}) {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download />,
      onClick: () => { onDownload(filePath); closeOverlay(); },
    },
    {
      name: 'Rename',
      icon: <icons.ICursor />,
      onClick: () => { onRename(fileId); closeOverlay(); },
    },
    {
      name: 'Move',
      icon: <icons.FolderMove />,
      onClick: () => { onMove(fileId); closeOverlay(); },
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="text-red-600" />,
      onClick: () => { onDelete(fileId); closeOverlay(); },
    },
  ];

  return <ActionsMenu menu={menu} />;
}

FileActions.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
  fileId: PropTypes.number.isRequired,
  filePath: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FileActions;
