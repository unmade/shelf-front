import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../../../icons';
import { MediaItemShape } from '../../../../../types';

import Button from '../../../../../components/ui/Button';

import { useDeleteDialog } from '../../../../../components/DeleteDialogProvider';
import useFileFromMediaItem from '../../../hooks/file-from-media-item';

function DeleteButton({ className, mediaItem }) {
  const file = useFileFromMediaItem(mediaItem);
  const openDeleteDialog = useDeleteDialog();

  return (
    <Button
      className={className}
      title="Move to Trash"
      variant="text"
      size="base"
      icon={<icons.TrashOutlined className="h-5 w-5" />}
      color="danger"
      onClick={() => openDeleteDialog([file])}
    />
  );
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  mediaItem: MediaItemShape.isRequired,
};

DeleteButton.defaultProps = {
  className: '',
};

export default DeleteButton;
