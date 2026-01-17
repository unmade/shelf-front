import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface PreviewContextValue {
  /** ID of the file currently being previewed, or null if no preview */
  previewFileId: string | null;
  /** Set the file to preview */
  setPreviewFileId: (id: string | null) => void;
  /** Open preview for a file */
  openPreview: (id: string) => void;
  /** Close the preview panel */
  closePreview: () => void;
  /** Whether the preview panel is open */
  isPreviewOpen: boolean;
}

const PreviewContext = createContext<PreviewContextValue | null>(null);

interface PreviewProviderProps {
  children: React.ReactNode;
}

export function PreviewProvider({ children }: PreviewProviderProps) {
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  const openPreview = useCallback((id: string) => {
    setPreviewFileId(id);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewFileId(null);
  }, []);

  const isPreviewOpen = previewFileId !== null;

  const value = useMemo(
    () => ({
      previewFileId,
      setPreviewFileId,
      openPreview,
      closePreview,
      isPreviewOpen,
    }),
    [previewFileId, openPreview, closePreview, isPreviewOpen],
  );

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreviewContext() {
  const context = useContext(PreviewContext);
  if (context === null) {
    throw new Error('usePreviewContext must be used within a PreviewProvider');
  }
  return context;
}
