import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { scopes } from '../store/actions/loading';
import { addBookmark, removeBookmark } from '../store/actions/users';
import { getFileById } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import * as icons from '../icons';

const iconSizes = {
  base: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const ringSizes = {
  base: 'focus:ring-2',
  lg: 'focus:ring',
};

function BookmarkButton({ className, fileId, size }) {
  const dispatch = useDispatch();
  const file = useSelector((state) => getFileById(state, fileId));
  const loading = useSelector((state) => getLoading(state, scopes.bookmarking));

  const iconClasses = `${(file.starred) ? 'fill-current' : ''} ${iconSizes[size]}`;

  const onClick = () => {
    if (file.starred) {
      dispatch(removeBookmark(file.id));
    } else {
      dispatch(addBookmark(file.id));
    }
  };

  return (
    <button
      type="button"
      title="Add to Saved"
      className={`p-2 show-on-hover-target text-gray-300 hover:text-orange-600 transition-colors rounded-xl focus:outline-none ${ringSizes[size]} ring-offset-2 ring-orange-300 ${className}`}
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
