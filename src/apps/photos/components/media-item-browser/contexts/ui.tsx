import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import {
  MediaItemActionsDropdown,
  type MediaItemActionsDropdownProps,
} from '@/apps/photos/components/media-item-actions-dropdown';

export type ViewMode = 'table' | 'grid';

type MediaItemActionsDropdownComponent = React.ComponentType<MediaItemActionsDropdownProps>;

interface MediaItemBrowserContextValue {
  mediaItemActionsDropdown: MediaItemActionsDropdownComponent;
  previewedId: string | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  openPreview: (id: string) => void;
  closePreview: () => void;
}

const MediaItemBrowserContext = createContext<MediaItemBrowserContextValue | null>(null);

interface MediaItemBrowserProviderProps {
  children: React.ReactNode;
  defaultViewMode?: ViewMode;
  mediaItemActionsDropdown?: MediaItemActionsDropdownComponent;
}

export function MediaItemBrowserProvider({
  children,
  defaultViewMode = 'grid',
  mediaItemActionsDropdown = MediaItemActionsDropdown,
}: MediaItemBrowserProviderProps) {
  const [previewedId, setPreviewedId] = useState<string | null>(null);
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultViewMode);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const openPreview = useCallback((id: string) => {
    setPreviewedId(id);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewedId(null);
  }, []);

  const value = useMemo(
    () => ({
      mediaItemActionsDropdown,
      previewedId,
      viewMode,
      setViewMode,
      openPreview,
      closePreview,
    }),
    [mediaItemActionsDropdown, previewedId, viewMode, setViewMode, openPreview, closePreview],
  );

  return (
    <MediaItemBrowserContext.Provider value={value}>{children}</MediaItemBrowserContext.Provider>
  );
}

export function useMediaItemBrowser() {
  const context = useContext(MediaItemBrowserContext);
  if (context === null) {
    throw new Error('useMediaItemBrowser must be used within a MediaItemBrowserProvider');
  }
  return context;
}
