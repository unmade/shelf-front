import { createContext, useContext, useMemo } from 'react';

import type { EntityState } from '@reduxjs/toolkit';

import type { FileSchema } from '@/store/files';

interface FileBrowserDataContextValue {
  data: EntityState<FileSchema, string> | undefined;
  isLoading: boolean;
  isError: boolean;
}

const FileBrowserDataContext = createContext<FileBrowserDataContextValue | null>(null);

interface FileBrowserDataProviderProps {
  children: React.ReactNode;
  data: EntityState<FileSchema, string> | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function FileBrowserDataProvider({
  children,
  data,
  isLoading,
  isError,
}: FileBrowserDataProviderProps) {
  const value = useMemo(() => ({ data, isLoading, isError }), [data, isLoading, isError]);

  return (
    <FileBrowserDataContext.Provider value={value}>{children}</FileBrowserDataContext.Provider>
  );
}

export function useFileBrowserData() {
  const context = useContext(FileBrowserDataContext);
  if (context === null) {
    throw new Error('useFileBrowserData must be used within a FileBrowserDataProvider');
  }
  return context;
}

export function useSelectFiles(fileIds: Set<string>): FileSchema[] {
  const { data } = useFileBrowserData();

  return useMemo(() => {
    if (!data) return [];
    return [...fileIds]
      .map((id) => data.entities[id])
      .filter((file): file is FileSchema => file !== undefined);
  }, [data, fileIds]);
}

export function useSelectCountFiles(): number {
  const { data } = useFileBrowserData();
  return data?.ids.length ?? 0;
}
