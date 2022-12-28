import React from 'react';

import useFileActions from '../hooks/file-actions';

import * as icons from '../icons';
import { FileShape } from '../types';

import Button from './ui/Button';
import Menu from './ui/Menu';

const ActionButton = React.forwardRef(({ item }, ref) => (
  <Button
    innerRef={ref}
    key={item.name}
    type="text"
    onClick={(event) => {
      event.stopPropagation();
      item.onClick();
    }}
    danger={item.danger}
    full
  >
    <div className="my-1 flex w-full flex-row items-center justify-between whitespace-nowrap">
      <div>{item.name}</div>
      <div className="ml-6">{item.icon}</div>
    </div>
  </Button>
));

function FileTableCellActions({ item }) {
  const menu = useFileActions([item]);
  const groups = [{ key: 'acitons', items: menu }];
  return (
    <Menu groups={groups} itemRender={ActionButton}>
      <Button
        as="div"
        type="text"
        size="lg"
        icon={<icons.MoreOutlined className="h-4 w-4 dark:text-zinc-400" />}
      />
    </Menu>
  );
}

FileTableCellActions.propTypes = {
  item: FileShape.isRequired,
};

export default FileTableCellActions;
