import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../../../icons';
import { MediaItemShape } from '../../../../../types';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDownloadAction,
} from '../../../../../hooks/file-actions';

import useFileFromMediaItem from '../../../hooks/file-from-media-item';

import Button from '../../../../../components/ui/Button';
import Menu from '../../../../../components/ui/Menu';
import MenuItem from '../../../../../components/ui/MenuItem';

import { useInformationDialogContext } from '../InformationDialogProvider';

function useInformationAction(file) {
  const openInformationDialog = useInformationDialogContext();
  return {
    key: 'info',
    name: 'Info',
    icon: <icons.InformationCircleOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openInformationDialog(file);
    },
  };
}

function MoreButton({ className, mediaItem }) {
  const file = useFileFromMediaItem(mediaItem);

  const infoAction = useInformationAction(file);
  const copyLinkAction = useCopyLinkAction([file]);
  const deleteAction = useDeleteAction([file]);
  const downloadAction = useDownloadAction([file]);

  const groups = [
    {
      key: 'common',
      items: [infoAction],
    },
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction].filter((action) => action != null),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <Menu
      buttonClassName={className}
      panelClassName="min-w-[160px]"
      groups={groups}
      itemRenderer={MenuItem}
    >
      <Button
        as="div"
        variant="text"
        size="base"
        icon={<icons.MoreOutlined className="h-5 w-5" />}
      />
    </Menu>
  );
}

MoreButton.propTypes = {
  className: PropTypes.string,
  mediaItem: MediaItemShape.isRequired,
};

MoreButton.defaultProps = {
  className: '',
};

export default MoreButton;
