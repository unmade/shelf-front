import * as icons from '@/icons';

import { Button } from '@/ui/button';

import { useCreateAlbumDialog } from '@/components/photos/CreateAlbumDialogProvider';

export default function CreateAlbumButton() {
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Button
      size="icon"
      onClick={() => {
        openDialog();
      }}
    >
      <icons.Plus />
    </Button>
  );
}
