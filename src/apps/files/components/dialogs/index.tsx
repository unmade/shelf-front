export { useCopyLinkDialog } from './copy-link';
export { useCreateFolderDialog } from './create-folder';
export { useDeleteDialog } from './delete';
export { useDeleteImmediatelyDialog } from './delete-immediately';
export { useEmptyTrashDialog } from './empty-trash';
export { useFileMembersDialog } from './file-members';
export { useMoveDialog } from './move';
export { useRenameFileDialog } from './rename-file';

import type React from 'react';

import { FileInfoSheetProvider } from '@/apps/files/components/file-info-sheet';

import { CopyLinkDialog, useCopyLinkDialog } from './copy-link';
import { CreateFolderDialog, useCreateFolderDialog } from './create-folder';
import { DeleteDialogContainer, useDeleteDialog } from './delete';
import { DeleteImmediatelyDialogContainer, useDeleteImmediatelyDialog } from './delete-immediately';
import { EmptyTrashDialogContainer, useEmptyTrashDialog } from './empty-trash';
import { FileMembersDialog, useFileMembersDialog } from './file-members';
import { MoveDialog, useMoveDialog } from './move';
import { RenameFileDialog, useRenameFileDialog } from './rename-file';

import { FilesDialogsRegistryProvider, useFilesDialogsRegistry } from './registry';

interface DialogsProviderProps {
  children: React.ReactNode;
}

function DialogsRenderer() {
  const { state } = useFilesDialogsRegistry();
  const { closeDialog: closeCopyLink } = useCopyLinkDialog();
  const { closeDialog: closeCreateFolder } = useCreateFolderDialog();
  const { closeDialog: closeDelete } = useDeleteDialog();
  const { closeDialog: closeDeleteImmediately } = useDeleteImmediatelyDialog();
  const { closeDialog: closeEmptyTrash } = useEmptyTrashDialog();
  const { closeDialog: closeFileMembers } = useFileMembersDialog();
  const { closeDialog: closeMove } = useMoveDialog();
  const { closeDialog: closeRenameFile } = useRenameFileDialog();

  return (
    <>
      <CopyLinkDialog
        file={state.copyLink.file}
        open={state.copyLink.open}
        onClose={closeCopyLink}
      />
      {state.createFolder.path != null && (
        <CreateFolderDialog
          inPath={state.createFolder.path}
          open={state.createFolder.open}
          onClose={closeCreateFolder}
        />
      )}
      <DeleteDialogContainer
        files={state.delete.files}
        open={state.delete.open}
        onClose={closeDelete}
      />
      <DeleteImmediatelyDialogContainer
        files={state.deleteImmediately.files}
        open={state.deleteImmediately.open}
        onClose={closeDeleteImmediately}
      />
      <EmptyTrashDialogContainer open={state.emptyTrash.open} onClose={closeEmptyTrash} />
      <FileMembersDialog
        fileId={state.fileMembers.fileId}
        open={state.fileMembers.open}
        onClose={closeFileMembers}
      />
      <MoveDialog files={state.move.files} open={state.move.open} onClose={closeMove} />
      <RenameFileDialog
        file={state.renameFile.file}
        open={state.renameFile.open}
        onClose={closeRenameFile}
      />
    </>
  );
}

export function DialogsProvider({ children }: DialogsProviderProps) {
  return (
    <FileInfoSheetProvider>
      <FilesDialogsRegistryProvider>
        <DialogsRenderer />
        {children}
      </FilesDialogsRegistryProvider>
    </FileInfoSheetProvider>
  );
}
