import { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from '@/store/users';

import { useAppSelector } from '@/hooks';

import { Toggle, type ToggleVariants } from '@/ui/toggle';

function useToggleBookmark(fileIds: string[]) {
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

interface Props {
  className?: string;
  fileIds: string[];
  children: React.ReactNode;
}

export function BookmarkToggle({
  children,
  className,
  fileIds,
  variant,
  size,
}: Props & ToggleVariants) {
  const { t } = useTranslation();

  const { bookmarked, loading, toggleBookmark } = useToggleBookmark(fileIds);

  const title = bookmarked ? t('Remove from bookmarks') : t('Add to bookmarks');

  return (
    <Toggle
      title={title}
      className={cn(
        'data-[state=on]:*:[svg]:fill-orange-600 data-[state=on]:*:[svg]:stroke-orange-600',
        className,
      )}
      pressed={bookmarked}
      onPressedChange={toggleBookmark}
      disabled={loading}
      variant={variant}
      size={size}
    >
      {children}
    </Toggle>
  );
}
