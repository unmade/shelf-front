import React from 'react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import { useEmptyMediaItemsTrashDialog } from 'components/photos/EmptyMediaItemsTrashDialogProvider';

export default function EmptyTrashDialogButton() {
  const { openDialog } = useEmptyMediaItemsTrashDialog();

  return (
    <Button
      variant="primary"
      color="danger"
      title="Empty Trash"
      size="base"
      onClick={openDialog}
      icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
    />
  );
}
