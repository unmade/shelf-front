import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  selectIsBookmarked,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../store/users';

import * as icons from '../icons';

const iconSizes = {
  base: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const ringSizes = {
  base: 'focus:ring-2',
  lg: 'focus:ring',
};

const bookmarkClasses = {
  [true]: 'fill-current text-orange-600',
  [false]:
    'show-on-hover-target text-gray-300 dark:text-zinc-600 hover:text-orange-600 dark:hover:text-orange-600',
};

function BookmarkButton({ className, fileId, size }) {
  const { t } = useTranslation();

  const bookmarked = useSelector((state) => selectIsBookmarked(state, fileId));

  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const iconClasses = `${bookmarked ? 'fill-current' : ''} ${iconSizes[size]}`;
  const title = bookmarked ? t('Remove from Saved') : t('Add to Saved');

  const onClick = async (event) => {
    event.stopPropagation();
    if (bookmarked) {
      await removeBookmark(fileId);
    } else {
      await addBookmark(fileId);
    }
  };

  return (
    <button
      type="button"
      title={title}
      className={`p-2 ${bookmarkClasses[bookmarked]} rounded-xl transition-colors focus:outline-none ${ringSizes[size]} ring-orange-300 ring-offset-2 dark:ring-orange-700 dark:ring-offset-zinc-800 ${className}`}
      onClick={onClick}
    >
      <icons.BookmarkOutlined className={`${iconClasses}`} />
    </button>
  );
}

BookmarkButton.propTypes = {
  className: PropTypes.string,
  fileId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['base', 'lg']),
};

BookmarkButton.defaultProps = {
  className: '',
  size: 'base',
};

export default BookmarkButton;
