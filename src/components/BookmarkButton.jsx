import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

const iconSizes = {
  base: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const ringSizes = {
  base: 'focus:ring-2',
  lg: 'focus:ring',
};

function BookmarkButton({ className, size }) {
  return (
    <button
      type="button"
      title="Add to Saved"
      className={`p-2 show-on-hover-target text-gray-300 hover:text-orange-600 transition-colors rounded-xl focus:outline-none ${ringSizes[size]} ring-offset-2 ring-orange-300 ${className}`}
    >
      <icons.BookmarkOutlined className={iconSizes[size]} />
    </button>
  );
}

BookmarkButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['base', 'lg']),
};

BookmarkButton.defaultProps = {
  className: '',
  size: 'base',
};

export default BookmarkButton;
