import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { IMediaItem } from '@/types/photos';

import { FileSize } from '@/ui/filesize';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/ui/drawer';
import { TimeAgo } from '@/ui/timeago';

import { MediaItemSections } from '@/apps/photos/components/media-item-sections';

interface ContextValue {
  openMediaItemInfoSheet: (mediaItem: IMediaItem) => void;
}

const MediaItemInfoSheetContext = createContext<ContextValue | null>(null);

interface State {
  mediaItem: IMediaItem | null;
  open: boolean;
}

const initialState: State = { mediaItem: null, open: false };

export function MediaItemInfoSheetProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  const openMediaItemInfoSheet = useCallback((mediaItem: IMediaItem) => {
    setState({ mediaItem, open: true });
  }, []);

  const closeSheet = useCallback(() => {
    setState(initialState);
  }, []);

  const { mediaItem, open } = state;

  const value = useMemo(() => ({ openMediaItemInfoSheet }), [openMediaItemInfoSheet]);

  return (
    <MediaItemInfoSheetContext.Provider value={value}>
      <MediaItemInfoSheet mediaItem={mediaItem} open={open} onClose={closeSheet} />
      {children}
    </MediaItemInfoSheetContext.Provider>
  );
}

export function useMediaItemInfoSheet(): ContextValue {
  const value = useContext(MediaItemInfoSheetContext);
  if (value == null) {
    throw new Error('`useMediaItemInfoSheet` must be used within a `MediaItemInfoSheetProvider`');
  }
  return value;
}

interface MediaItemInfoSheetProps {
  mediaItem: IMediaItem | null;
  open: boolean;
  onClose: () => void;
}

function MediaItemInfoSheet({ mediaItem, open, onClose }: MediaItemInfoSheetProps) {
  if (!mediaItem) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="wrap-break-word">{mediaItem.name}</DrawerTitle>
          <DrawerDescription>
            <FileSize bytes={mediaItem.size} />
            <span> • </span>
            <TimeAgo value={mediaItem.modifiedAt} />
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <MediaItemSections mediaItem={mediaItem} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
