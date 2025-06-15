import React from 'react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import { useCreateAlbumDialog } from 'components/photos/CreateAlbumDialogProvider';

export default function CreateAlbumButton() {
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Button
      variant="primary"
      size="lg"
      icon={<icons.Plus className="h-5 w-5 shrink-0" />}
      onClick={() => {
        openDialog();
      }}
    />
  );
}
