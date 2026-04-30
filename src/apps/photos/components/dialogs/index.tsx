export { useAddToAlbumDialog } from './add-to-album';
export { useCreateAlbumDialog } from './create-album';
export { useDeleteAlbumDialog } from './delete-album';
export { useDeleteMediaItemsDialog } from './delete';
export { useDeleteMediaItemsImmediatelyDialog } from './delete-immediately';
export { useEmptyTrashDialog } from './empty-trash';
export { useRenameAlbumDialog } from './rename-album';

import type React from 'react';

import { AddToAlbumDialog, useAddToAlbumDialog } from './add-to-album';
import { CreateAlbumDialog, useCreateAlbumDialog } from './create-album';
import { DeleteMediaItemsDialog, useDeleteMediaItemsDialog } from './delete';
import { DeleteAlbumDialog, useDeleteAlbumDialog } from './delete-album';
import {
  DeleteMediaItemsImmediatelyDialog,
  useDeleteMediaItemsImmediatelyDialog,
} from './delete-immediately';
import { EmptyTrashDialogContainer, useEmptyTrashDialog } from './empty-trash';
import { RenameAlbumDialog, useRenameAlbumDialog } from './rename-album';

import { PhotosDialogsRegistryProvider, usePhotosDialogsRegistry } from './registry';

interface DialogsProviderProps {
  children: React.ReactNode;
}

function MediaItemDialogsRenderer() {
  const { state } = usePhotosDialogsRegistry();
  const { closeDialog: closeCreateAlbum } = useCreateAlbumDialog();
  const { closeDialog: closeAddToAlbum } = useAddToAlbumDialog();
  const { closeDialog: closeDeleteMediaItems } = useDeleteMediaItemsDialog();
  const { closeDialog: closeDeleteMediaItemsImmediately } = useDeleteMediaItemsImmediatelyDialog();
  const { closeDialog: closeEmptyTrash } = useEmptyTrashDialog();

  return (
    <>
      <CreateAlbumDialog open={state.createAlbum.open} onClose={closeCreateAlbum} />
      <AddToAlbumDialog
        open={state.addToAlbum.open}
        mediaItems={state.addToAlbum.mediaItems}
        onClose={closeAddToAlbum}
      />
      <DeleteMediaItemsDialog
        open={state.deleteMediaItems.open}
        mediaItems={state.deleteMediaItems.mediaItems}
        onClose={closeDeleteMediaItems}
      />
      <DeleteMediaItemsImmediatelyDialog
        open={state.deleteMediaItemsImmediately.open}
        mediaItems={state.deleteMediaItemsImmediately.mediaItems}
        onClose={closeDeleteMediaItemsImmediately}
      />
      <EmptyTrashDialogContainer open={state.emptyTrash.open} onClose={closeEmptyTrash} />
    </>
  );
}

function AlbumDialogsRenderer() {
  const { state } = usePhotosDialogsRegistry();
  const { closeDialog: closeCreateAlbum } = useCreateAlbumDialog();
  const { closeDialog: closeDeleteAlbum } = useDeleteAlbumDialog();
  const { closeDialog: closeRenameAlbum } = useRenameAlbumDialog();

  return (
    <>
      <CreateAlbumDialog open={state.createAlbum.open} onClose={closeCreateAlbum} />
      <DeleteAlbumDialog
        open={state.deleteAlbum.open}
        album={state.deleteAlbum.album}
        onClose={closeDeleteAlbum}
      />
      <RenameAlbumDialog
        open={state.renameAlbum.open}
        album={state.renameAlbum.album}
        onClose={closeRenameAlbum}
      />
    </>
  );
}

export function MediaItemDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <PhotosDialogsRegistryProvider>
      <MediaItemDialogsRenderer />
      {children}
    </PhotosDialogsRegistryProvider>
  );
}

export function AlbumDialogsProvider({ children }: DialogsProviderProps) {
  return (
    <PhotosDialogsRegistryProvider>
      <AlbumDialogsRenderer />
      {children}
    </PhotosDialogsRegistryProvider>
  );
}
