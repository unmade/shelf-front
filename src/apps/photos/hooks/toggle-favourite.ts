import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/hooks';

import {
  selectIsFavouriteMediaItem,
  useMarkFavouriteMediaItemsMutation,
  useUnmarkFavouriteMediaItemsMutation,
} from '@/store/mediaItems';

export function useToggleFavourite(mediaItemIds: string[]) {
  const favourite = useAppSelector(
    (state) =>
      mediaItemIds.length > 0 && mediaItemIds.every((id) => selectIsFavouriteMediaItem(state, id)),
  );

  const [markFavouriteMediaItems, { isLoading: adding }] = useMarkFavouriteMediaItemsMutation();
  const [unmarkFavouriteMediaItems, { isLoading: removing }] =
    useUnmarkFavouriteMediaItemsMutation();

  const toggleFavourite = useCallback(async () => {
    if (favourite) {
      await unmarkFavouriteMediaItems(mediaItemIds);
    } else {
      await markFavouriteMediaItems(mediaItemIds);
    }
  }, [favourite, mediaItemIds, markFavouriteMediaItems, unmarkFavouriteMediaItems]);

  return useMemo(
    () => ({
      favourite,
      loading: adding || removing,
      toggleFavourite,
    }),
    [favourite, adding, removing, toggleFavourite],
  );
}
