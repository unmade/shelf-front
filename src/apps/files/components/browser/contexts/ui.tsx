import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ViewMode = 'table' | 'grid';

export type SortField = 'name' | 'modified_at' | 'size';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

interface FileBrowserContextValue {
  scrollKey: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const FileBrowserContext = createContext<FileBrowserContextValue | null>(null);

interface FileBrowserProviderProps {
  children: React.ReactNode;
  scrollKey: string;
  defaultViewMode?: ViewMode;
  defaultSortOption?: SortOption;
}

const DEFAULT_SORT_OPTION: SortOption = { field: 'name', direction: 'asc' };

export function FileBrowserProvider({
  children,
  scrollKey,
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
      scrollKey,
      viewMode,
      setViewMode,
      sortOption,
      setSortOption,
    }),
    [scrollKey, viewMode, setViewMode, sortOption, setSortOption],
  );

  return <FileBrowserContext.Provider value={value}>{children}</FileBrowserContext.Provider>;
}

export function useFileBrowserContext() {
  const context = useContext(FileBrowserContext);
  if (context === null) {
    throw new Error('`useFileBrowserContext` must be used within a `FileBrowserProvider`');
  }
  return context;
}
