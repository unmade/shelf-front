import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../../icons';
import { MediaItemShape } from '../../../../types';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDownloadAction,
  useFavouriteAction,
} from '../../../../hooks/file-actions';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

import Menu from '../../../../components/ui/Menu';
import MenuItem from '../../../../components/ui/MenuItem';

function useMediaItemActionGroups(item) {
  const files = [useFileFromMediaItem(item)];

  const toggleFavourite = useFavouriteAction(files);
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(files);
  const downloadAction = useDownloadAction(files);

  const groups = [
    {
      key: 'favourite',
      items: [toggleFavourite].filter((action) => action != null),
    },
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction].filter((action) => action != null),
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}

function GridItemMenu({ mediaItem, onOpen }) {
  const groups = useMediaItemActionGroups(mediaItem);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start" onOpen={onOpen}>
      <div className="rounded-full p-0.5 dark:bg-zinc-200 dark:text-zinc-600 dark:hover:bg-zinc-100">
        <icons.More className="h-3 w-3 shrink-0" />
      </div>
    </Menu>
  );
}

GridItemMenu.propTypes = {
  mediaItem: MediaItemShape.isRequired,
  onOpen: PropTypes.func,
};

GridItemMenu.defaultProps = {
  onOpen: null,
};

export default GridItemMenu;
