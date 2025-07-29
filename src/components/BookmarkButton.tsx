import type React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from 'store/users';

const iconSizes = {
  base: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const ringSizes = {
  base: 'focus:ring-2',
  lg: 'focus:ring',
};

const bookmarkedClass = 'fill-current text-orange-600';
const nonBookmarkedClass =
  'show-on-hover-target text-gray-300 dark:text-zinc-600 hover:text-orange-600 dark:hover:text-orange-600';

interface Props {
  className: React.CSSProperties;
  fileId: string;
  size: 'base' | 'lg';
}

export default function BookmarkButton({ className, fileId, size = 'base' }: Props) {
  const { t } = useTranslation();

  const bookmarked = useAppSelector((state) => selectIsBookmarked(state, fileId));

  const [addBookmarkBatch] = useAddBookmarkBatchMutation();
  const [removeBookmarkBatch] = useRemoveBookmarkBatchMutation();

  const iconClasses = `${bookmarked ? 'fill-current' : ''} ${iconSizes[size]}`;
  const title = bookmarked ? t('Remove from Saved') : t('Add to Saved');

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (bookmarked) {
      await removeBookmarkBatch([fileId]);
    } else {
      await addBookmarkBatch([fileId]);
    }
  };

  return (
    <button
      aria-label={title}
      type="button"
      title={title}
      className={`p-2 ${bookmarked ? bookmarkedClass : nonBookmarkedClass} rounded-xl transition-colors focus:outline-none ${ringSizes[size]} ring-orange-300 ring-offset-2 dark:ring-orange-700 dark:ring-offset-zinc-800 ${className}`}
      onClick={onClick}
    >
      <icons.BookmarkOutlined className={iconClasses} />
    </button>
  );
}
