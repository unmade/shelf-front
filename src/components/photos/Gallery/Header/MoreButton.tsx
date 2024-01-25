import React from 'react';
import PropTypes from 'prop-types';

import * as icons from 'icons';
import { MediaItemShape } from 'types';
import { IFile } from 'types/files';
import { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDeleteAction, useDownloadAction } from 'hooks/file-actions';

import Button from 'components/ui/Button';
import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

import { useInformationDialogContext } from '../InformationDialogProvider';

function useInformationAction(file: IFile) {
  const { openDialog } = useInformationDialogContext();
  return {
    key: 'info',
    name: 'Info',
    icon: <icons.InformationCircleOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openDialog(file);
    },
  };
}

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

function MoreButton({ className, mediaItem }: Props) {
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
        onClick={() => {}}
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
