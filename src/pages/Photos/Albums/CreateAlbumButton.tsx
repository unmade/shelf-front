import { PlusIcon } from '@/icons';

import { Button } from '@/ui/button';

import { useCreateAlbumDialog } from '@/apps/photos/components/dialogs';

export default function CreateAlbumButton() {
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Button
      size="icon"
      onClick={() => {
        openDialog();
      }}
    >
      <PlusIcon />
    </Button>
  );
}
