export { CopyLinkDialogProvider, useCopyLinkDialog } from './copy-link';
export { CreateFolderDialogProvider, useCreateFolderDialog } from './create-folder';
export { DeleteDialogProvider, useDeleteDialog } from './delete';
export { DeleteImmediatelyDialogProvider, useDeleteImmediatelyDialog } from './delete-immediately';
export { EmptyTrashDialogProvider, useEmptyTrashDialog } from './empty-trash';
export { FileMembersDialogProvider, useFileMembersDialog } from './file-members';
export { MoveDialogProvider, useMoveDialog } from './move';
export { RenameFileDialogProvider, useRenameFileDialog } from './rename-file';

import { CopyLinkDialogProvider } from './copy-link';
import { CreateFolderDialogProvider } from './create-folder';
import { DeleteDialogProvider } from './delete';
import { DeleteImmediatelyDialogProvider } from './delete-immediately';
import { MoveDialogProvider } from './move';
import { RenameFileDialogProvider } from './rename-file';
import { FileInfoSheetProvider } from '@/apps/files/components/file-info-sheet';

interface DialogsProviderProps {
  children: React.ReactNode;
}

export function DialogsProvider({ children }: DialogsProviderProps) {
  return (
    <FileInfoSheetProvider>
      <CopyLinkDialogProvider>
        <CreateFolderDialogProvider>
          <DeleteDialogProvider>
            <DeleteImmediatelyDialogProvider>
              <MoveDialogProvider>
                <RenameFileDialogProvider>{children}</RenameFileDialogProvider>
              </MoveDialogProvider>
            </DeleteImmediatelyDialogProvider>
          </DeleteDialogProvider>
        </CreateFolderDialogProvider>
      </CopyLinkDialogProvider>
    </FileInfoSheetProvider>
  );
}
