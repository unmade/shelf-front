import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { scopes } from '../store/actions/loading';
import { addBookmark, removeBookmark } from '../store/actions/users';
import { getLoading } from '../store/reducers/loading';
import { getIsBookmarked } from '../store/reducers/users';

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
  [false]: 'show-on-hover-target text-gray-300 hover:text-orange-600',
};

function BookmarkButton({ className, fileId, size }) {
  const dispatch = useDispatch();
  const bookmarked = useSelector((state) => getIsBookmarked(state, fileId));
  const loading = useSelector((state) => getLoading(state, scopes.bookmarking));

  const iconClasses = `${(bookmarked) ? 'fill-current' : ''} ${iconSizes[size]}`;
  const title = (bookmarked) ? 'Remove from Saved' : 'Add to Saved';

  const onClick = () => {
    if (bookmarked) {
      dispatch(removeBookmark(fileId));
    } else {
      dispatch(addBookmark(fileId));
    }
  };

  return (
    <button
      type="button"
      title={title}
      className={`p-2 ${bookmarkClasses[bookmarked]} transition-colors rounded-xl focus:outline-none ${ringSizes[size]} ring-offset-2 ring-orange-300 ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      <icons.BookmarkOutlined className={iconClasses} />
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
