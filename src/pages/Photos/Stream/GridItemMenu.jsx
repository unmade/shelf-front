import React from 'react';
import PropTypes from 'prop-types';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDownloadAction,
  useFavouriteAction,
} from '../../../hooks/file-actions';

import * as icons from '../../../icons';
import { FileShape } from '../../../types';

import Menu from '../../../components/ui/Menu';
import MenuItem from '../../../components/ui/MenuItem';

function useFileActionGroups(files) {
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

function GridItemMenu({ item, onOpen }) {
  const groups = useFileActionGroups([item]);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start" onOpen={onOpen}>
      <div className="p-0.5 dark:hover:bg-zinc-100 dark:bg-zinc-200 rounded-full dark:text-zinc-600">
        <icons.More className="shrink-0 w-3 h-3" />
      </div>
    </Menu>
  );
}

GridItemMenu.propTypes = {
  item: FileShape.isRequired,
  onOpen: PropTypes.func,
};

GridItemMenu.defaultProps = {
  onOpen: null,
};

export default GridItemMenu;
