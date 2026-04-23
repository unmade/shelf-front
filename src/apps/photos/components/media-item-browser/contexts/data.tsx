import { createContext, useContext, useMemo } from 'react';

import type { EntityState } from '@reduxjs/toolkit';

import type { IMediaItem } from '@/types/photos';

import { useListFavouriteMediaItemIdsQuery } from '@/store/mediaItems';

interface MediaItemsBrowserDataContextValue {
  data: EntityState<IMediaItem, string> | undefined;
  isLoading: boolean;
  isError: boolean;
  itemsCount?: number;
  loadMore?: () => void;
}

const MediaItemsBrowserDataContext = createContext<MediaItemsBrowserDataContextValue | null>(null);

interface MediaItemsBrowserDataProviderProps {
  children: React.ReactNode;
  data: EntityState<IMediaItem, string> | undefined;
  isLoading: boolean;
  isError: boolean;
  itemsCount?: number;
  loadMore?: () => void;
}

export function MediaItemsBrowserDataProvider({
  children,
  data,
  isLoading,
  isError,
  itemsCount,
  loadMore,
}: MediaItemsBrowserDataProviderProps) {
  useListFavouriteMediaItemIdsQuery(undefined);

  const value = useMemo(
    () => ({ data, isLoading, isError, itemsCount, loadMore }),
    [data, isLoading, isError, itemsCount, loadMore],
  );

  return (
    <MediaItemsBrowserDataContext.Provider value={value}>
      {children}
    </MediaItemsBrowserDataContext.Provider>
  );
}

export function useMediaItemsBrowserData() {
  const context = useContext(MediaItemsBrowserDataContext);
  if (context === null) {
    throw new Error('useMediaItemsBrowserData must be used within a MediaItemsBrowserDataProvider');
  }
  return context;
}

export function useSelectMediaItems(mediaItemIds: Set<string>): IMediaItem[] {
  const { data } = useMediaItemsBrowserData();

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return [...mediaItemIds]
      .map((id) => data.entities[id])
      .filter((mediaItem): mediaItem is IMediaItem => mediaItem !== undefined);
  }, [data, mediaItemIds]);
}

export function useSelectCountMediaItems(): number {
  const { data } = useMediaItemsBrowserData();
  return data?.ids.length ?? 0;
}
