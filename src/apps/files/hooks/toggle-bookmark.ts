import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/hooks';

import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from '@/store/users';

export function useToggleBookmark(fileId: string) {
  const bookmarked = useAppSelector((state) => selectIsBookmarked(state, fileId));

  const [addBookmarkBatch, { isLoading: adding }] = useAddBookmarkBatchMutation();
  const [removeBookmarkBatch, { isLoading: removing }] = useRemoveBookmarkBatchMutation();

  const toggleBookmark = useCallback(async () => {
    if (bookmarked) {
      await removeBookmarkBatch([fileId]);
    } else {
      await addBookmarkBatch([fileId]);
    }
  }, [bookmarked, fileId, addBookmarkBatch, removeBookmarkBatch]);

  return useMemo(
    () => ({
      bookmarked,
      loading: adding || removing,
      toggleBookmark,
    }),
    [bookmarked, adding, removing, toggleBookmark],
  );
}
