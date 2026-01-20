import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface GalleryContextValue {
  /** ID of the file currently shown in gallery, or null if gallery is closed */
  currentFileId: string | null;
  /** All file IDs available for navigation */
  fileIds: string[];
  /** Current index in the file list */
  currentIndex: number;
  /** Whether the gallery is open */
  isOpen: boolean;
  /** Open gallery at a specific file */
  openGallery: (fileId: string) => void;
  /** Close the gallery */
  closeGallery: () => void;
  /** Navigate to the next file */
  goToNext: () => void;
  /** Navigate to the previous file */
  goToPrevious: () => void;
  /** Navigate to a specific file by ID */
  goToFile: (fileId: string) => void;
  /** Whether there's a next file */
  hasNext: boolean;
  /** Whether there's a previous file */
  hasPrevious: boolean;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

interface GalleryProviderProps {
  /** All file IDs that can be navigated in the gallery */
  fileIds: string[];
  children: React.ReactNode;
}

/**
 * Provider for the file gallery.
 * The gallery allows viewing files in a full-screen carousel with prev/next navigation.
 *
 * @example
 * ```tsx
 * // In FileBrowser, wrap content with GalleryProvider
 * <GalleryProvider fileIds={sortedData.ids}>
 *   <FileBrowserContent />
 *   <FileGallery /> // Renders via portal to body
 * </GalleryProvider>
 * ```
 */
export function GalleryProvider({ fileIds, children }: GalleryProviderProps) {
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);

  const currentIndex = useMemo(() => {
    if (!currentFileId) return -1;
    return fileIds.indexOf(currentFileId);
  }, [currentFileId, fileIds]);

  const hasNext = currentIndex >= 0 && currentIndex < fileIds.length - 1;
  const hasPrevious = currentIndex > 0;
  const isOpen = currentFileId !== null;

  const openGallery = useCallback((fileId: string) => {
    setCurrentFileId(fileId);
  }, []);

  const closeGallery = useCallback(() => {
    setCurrentFileId(null);
  }, []);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentFileId(fileIds[currentIndex + 1]);
    }
  }, [hasNext, fileIds, currentIndex]);

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentFileId(fileIds[currentIndex - 1]);
    }
  }, [hasPrevious, fileIds, currentIndex]);

  const goToFile = useCallback(
    (fileId: string) => {
      if (fileIds.includes(fileId)) {
        setCurrentFileId(fileId);
      }
    },
    [fileIds],
  );

  const value = useMemo<GalleryContextValue>(
    () => ({
      currentFileId,
      fileIds,
      currentIndex,
      isOpen,
      openGallery,
      closeGallery,
      goToNext,
      goToPrevious,
      goToFile,
      hasNext,
      hasPrevious,
    }),
    [
      currentFileId,
      fileIds,
      currentIndex,
      isOpen,
      openGallery,
      closeGallery,
      goToNext,
      goToPrevious,
      goToFile,
      hasNext,
      hasPrevious,
    ],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGalleryContext() {
  const context = useContext(GalleryContext);
  if (context === null) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
}

/**
 * Hook to check if gallery context is available (for optional usage)
 */
export function useGalleryContextSafe() {
  return useContext(GalleryContext);
}
