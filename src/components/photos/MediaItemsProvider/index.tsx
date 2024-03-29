import React, { createContext, useContext, useMemo } from 'react';

import { RootState } from 'store/store';
import { IMediaItem } from 'types/photos';

interface ContextValue {
  ids: string[] | undefined;
  loading?: boolean;
  onItemClick: (itemId: string) => void;
  selectById: (state: RootState, id: string) => IMediaItem | undefined;
}

const MediaItemsContext = createContext<ContextValue>({
  ids: [],
  loading: false,
  onItemClick: () => undefined,
  selectById: () => undefined,
});

interface Props extends ContextValue {
  children: React.ReactNode;
}

export default function MediaItemsProvider({
  children,
  ids,
  loading = false,
  onItemClick,
  selectById,
}: Props) {
  const ctx = useMemo<ContextValue>(
    () => ({
      ids,
      loading,
      onItemClick,
      selectById,
    }),
    [ids, loading, selectById],
  );

  return <MediaItemsContext.Provider value={ctx}>{children}</MediaItemsContext.Provider>;
}

export function useMediaItemsData(): ContextValue {
  return useContext(MediaItemsContext);
}
