import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ViewMode = 'table' | 'grid';

export type SortField = 'name' | 'modified_at' | 'size';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

interface FileBrowserContextValue {
  /** Current view mode (table or grid) */
  viewMode: ViewMode;
  /** Set the current view mode */
  setViewMode: (mode: ViewMode) => void;
  /** Current sort option */
  sortOption: SortOption;
  /** Set the current sort option */
  setSortOption: (option: SortOption) => void;
}

const FileBrowserContext = createContext<FileBrowserContextValue | null>(null);

interface FileBrowserProviderProps {
  children: React.ReactNode;
  /** Initial view mode, defaults to 'table' */
  defaultViewMode?: ViewMode;
  /** Initial sort option, defaults to name ascending */
  defaultSortOption?: SortOption;
}

const DEFAULT_SORT_OPTION: SortOption = { field: 'name', direction: 'asc' };

export function FileBrowserProvider({
  children,
  defaultViewMode = 'table',
  defaultSortOption = DEFAULT_SORT_OPTION,
}: FileBrowserProviderProps) {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultViewMode);
  const [sortOption, setSortOptionState] = useState<SortOption>(defaultSortOption);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const setSortOption = useCallback((option: SortOption) => {
    setSortOptionState(option);
  }, []);

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      sortOption,
      setSortOption,
    }),
    [viewMode, setViewMode, sortOption, setSortOption],
  );

  return <FileBrowserContext.Provider value={value}>{children}</FileBrowserContext.Provider>;
}

export function useFileBrowserContext() {
  const context = useContext(FileBrowserContext);
  if (context === null) {
    throw new Error('useFileBrowserContext must be used within a FileBrowserProvider');
  }
  return context;
}
