import type React from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { useAppSelector } from '@/hooks';

import * as icons from '@/icons';

import { Toggle } from '@/ui/toggle';

import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from 'store/users';

function stopPropagation(event: React.MouseEvent) {
  event.stopPropagation();
}

interface Props {
  className?: string;
  fileId: string;
}

export default function BookmarkButton({ className, fileId }: Props) {
  const { t } = useTranslation();

  const bookmarked = useAppSelector((state) => selectIsBookmarked(state, fileId));

  const [addBookmarkBatch, { isLoading: adding }] = useAddBookmarkBatchMutation();
  const [removeBookmarkBatch, { isLoading: removing }] = useRemoveBookmarkBatchMutation();

  const title = bookmarked ? t('Remove from Saved') : t('Add to Saved');

  const handlePressedChange = async (pressed: boolean) => {
    if (pressed) {
      await addBookmarkBatch([fileId]);
    } else {
      await removeBookmarkBatch([fileId]);
    }
  };

  return (
    <Toggle
      title={title}
      className={cn(
        'text-muted-foreground',
        'hover:data-[state=on]:bg-muted data-[state=on]:bg-transparent',
        'data-[state=on]:*:[svg]:fill-orange-600 data-[state=on]:*:[svg]:stroke-orange-600',
        className,
      )}
      pressed={bookmarked}
      onPressedChange={handlePressedChange}
      onClick={stopPropagation}
      disabled={adding || removing}
    >
      <icons.BookmarkOutlined />
    </Toggle>
  );
}
