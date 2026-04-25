import { createContext, useContext, useMemo } from 'react';

import type { EntityState } from '@reduxjs/toolkit';

import type { IAlbum } from '@/types/photos';

interface AlbumsBrowserDataContextValue {
  data: EntityState<IAlbum, string> | undefined;
  isLoading: boolean;
  isError: boolean;
  loadMore?: () => void;
}

const AlbumsBrowserDataContext = createContext<AlbumsBrowserDataContextValue | null>(null);

interface AlbumsBrowserDataProviderProps {
  children: React.ReactNode;
  data: EntityState<IAlbum, string> | undefined;
  isLoading: boolean;
  isError: boolean;
  loadMore?: () => void;
}

export function AlbumsBrowserDataProvider({
  children,
  data,
  isLoading,
  isError,
  loadMore,
}: AlbumsBrowserDataProviderProps) {
  const value = useMemo(
    () => ({ data, isLoading, isError, loadMore }),
    [data, isLoading, isError, loadMore],
  );

  return (
    <AlbumsBrowserDataContext.Provider value={value}>{children}</AlbumsBrowserDataContext.Provider>
  );
}

export function useAlbumsBrowserData() {
  const context = useContext(AlbumsBrowserDataContext);
  if (context === null) {
    throw new Error('useAlbumsBrowserData must be used within an AlbumsBrowserDataProvider');
  }
  return context;
}
