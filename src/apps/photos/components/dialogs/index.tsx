export { AddToAlbumDialogProvider, useAddToAlbumDialog } from './add-to-album';
export { CreateAlbumDialogProvider, useCreateAlbumDialog } from './create-album';
export { DeleteAlbumDialogProvider, useDeleteAlbumDialog } from './delete-album';
export { DeleteMediaItemsDialogProvider, useDeleteMediaItemsDialog } from './delete';
export {
  DeleteMediaItemsImmediatelyDialogProvider,
  useDeleteMediaItemsImmediatelyDialog,
} from './delete-immediately';
export { EmptyTrashDialogProvider, useEmptyTrashDialog } from './empty-trash';
export { RenameAlbumDialogProvider, useRenameAlbumDialog } from './rename-album';

import type React from 'react';

import { AddToAlbumDialogProvider } from './add-to-album';
import { CreateAlbumDialogProvider } from './create-album';
import { DeleteAlbumDialogProvider } from './delete-album';
import { DeleteMediaItemsDialogProvider } from './delete';
import { DeleteMediaItemsImmediatelyDialogProvider } from './delete-immediately';
import { RenameAlbumDialogProvider } from './rename-album';

interface DialogsProviderProps {
  children: React.ReactNode;
}

export function MediaItemDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <AddToAlbumDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <DeleteMediaItemsImmediatelyDialogProvider>
          {children}
        </DeleteMediaItemsImmediatelyDialogProvider>
      </DeleteMediaItemsDialogProvider>
    </AddToAlbumDialogProvider>
  );
}

export function AlbumDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <CreateAlbumDialogProvider>
      <DeleteAlbumDialogProvider>
        <RenameAlbumDialogProvider>{children}</RenameAlbumDialogProvider>
      </DeleteAlbumDialogProvider>
    </CreateAlbumDialogProvider>
  );
}
