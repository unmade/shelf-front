import React from 'react';
import PropTypes from 'prop-types';

import { useCopyLinkAction, useDeleteAction, useDownloadAction } from '../../../hooks/file-actions';

import * as icons from '../../../icons';
import { FileShape } from '../../../types';

import Button from '../../../components/ui/Button';
import Menu from '../../../components/ui/Menu';

function useFileActionGroups(files) {
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(files);
  const downloadAction = useDownloadAction(files);

  const groups = [
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

const ActionButton = React.forwardRef(({ item }, ref) => (
  <Button
    innerRef={ref}
    key={item.name}
    variant="text"
    color={item.danger ? 'danger' : 'primary'}
    onClick={(event) => {
      event.stopPropagation();
      item.onClick();
    }}
    full
  >
    <div className="my-1 flex w-full flex-row items-center justify-between whitespace-nowrap">
      <div>{item.name}</div>
      <div className="ml-6">{item.icon}</div>
    </div>
  </Button>
));

function GridItemMenu({ item, onOpen }) {
  const groups = useFileActionGroups([item]);
  return (
    <Menu groups={groups} itemRender={ActionButton} placement="bottom-start" onOpen={onOpen}>
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
