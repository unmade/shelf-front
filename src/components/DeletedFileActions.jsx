import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import ActionsMenu from './ActionsMenu';

function DeletedFileActions({ fileId, onDeleteImmediately }) {
  const menu = [
    {
      name: 'Delete Immediately',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => {
        onDeleteImmediately(fileId);
      },
    },
  ];

  return <ActionsMenu menu={menu} />;
}

DeletedFileActions.propTypes = {
  fileId: PropTypes.string.isRequired,
  onDeleteImmediately: PropTypes.func.isRequired,
};

export default DeletedFileActions;
