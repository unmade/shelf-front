import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/hooks';

import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from '@/store/users';

export function useToggleBookmark(fileIds: string[]) {
  const bookmarked = useAppSelector((state) =>
    fileIds.every((id) => selectIsBookmarked(state, id)),
  );

  const [addBookmarkBatch, { isLoading: adding }] = useAddBookmarkBatchMutation();
  const [removeBookmarkBatch, { isLoading: removing }] = useRemoveBookmarkBatchMutation();

  const toggleBookmark = useCallback(async () => {
    if (bookmarked) {
      await removeBookmarkBatch(fileIds);
    } else {
      await addBookmarkBatch(fileIds);
    }
  }, [bookmarked, fileIds, addBookmarkBatch, removeBookmarkBatch]);

  return useMemo(
    () => ({
      bookmarked,
      loading: adding || removing,
      toggleBookmark,
    }),
    [bookmarked, adding, removing, toggleBookmark],
  );
}
