import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import ActionsMenu from './ActionsMenu';

function DeletedFileActions({ closeOverlay, fileId, onDeleteImmediately }) {
  const menu = [
    {
      name: <span className="text-red-600">Delete Immediately</span>,
      icon: <icons.TrashOutlined className="w-4 h-4 text-red-600" />,
      onClick: () => { onDeleteImmediately(fileId); closeOverlay(); },
    },
  ];

  return <ActionsMenu menu={menu} />;
}

DeletedFileActions.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
  fileId: PropTypes.string.isRequired,
  onDeleteImmediately: PropTypes.func.isRequired,
};

export default DeletedFileActions;
