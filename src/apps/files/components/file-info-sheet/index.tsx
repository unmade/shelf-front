import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { type FileSchema } from '@/store/files';

import { FileSize } from '@/ui/filesize';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/ui/drawer';
import { TimeAgo } from '@/ui/timeago';

import { FileSections } from '@/apps/files/components/file-sections';

interface ContextValue {
  openFileInfoSheet: (file: FileSchema) => void;
}

const FileInfoSheetContext = createContext<ContextValue | null>(null);

interface State {
  file: FileSchema | null;
  open: boolean;
}

const initialState: State = { file: null, open: false };

export function FileInfoSheetProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  const openFileInfoSheet = useCallback((file: FileSchema) => {
    setState({ file, open: true });
  }, []);

  const closeSheet = useCallback(() => {
    setState(initialState);
  }, []);

  const { file, open } = state;

  const value = useMemo(() => ({ openFileInfoSheet }), [openFileInfoSheet]);

  return (
    <FileInfoSheetContext.Provider value={value}>
      <FileInfoSheet file={file} open={open} onClose={closeSheet} />
      {children}
    </FileInfoSheetContext.Provider>
  );
}

export function useFileInfoSheet(): ContextValue {
  const value = useContext(FileInfoSheetContext);
  if (value == null) {
    throw new Error('`useFileInfoSheet` must be used within a `FileInfoSheetProvider`');
  }
  return value;
}

interface FileInfoSheetProps {
  file: FileSchema | null;
  open: boolean;
  onClose: () => void;
}

function FileInfoSheet({ file, open, onClose }: FileInfoSheetProps) {
  if (!file) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="wrap-break-word">{file.name}</DrawerTitle>
          <DrawerDescription>
            <FileSize bytes={file.size} />
            <span> • </span>
            <TimeAgo value={file.modified_at} />
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <FileSections file={file} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
