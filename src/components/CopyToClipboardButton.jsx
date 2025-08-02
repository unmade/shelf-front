import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import { Children } from '../types';

import Button from './ui-legacy/Button';

const PENDING = 'pending';
const COPIED = 'copied';

function CopyToClipboardButton({ children, className, disabled, title, value }) {
  const [state, setState] = React.useState(PENDING);

  React.useEffect(() => {
    let timeout = null;
    if (state === COPIED) {
      timeout = setTimeout(() => {
        setState(PENDING);
      }, 2500);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const onClick = (event) => {
    event.preventDefault();
    if (value != null && value !== '') {
      navigator.clipboard?.writeText(value);
    }
    setState(COPIED);
  };

  const icon =
    state === COPIED ? (
      <icons.Check className="h-4 w-4 shrink-0 text-teal-400 dark:text-teal-500" />
    ) : (
      <icons.Duplicate className="h-4 w-4 shrink-0 text-gray-400 dark:text-zinc-500" />
    );

  const borders =
    state === COPIED
      ? 'focus:ring-teal-300 border-teal-200 dark:focus:ring-teal-700 dark:border-teal-600 z-30'
      : '';

  return (
    <Button
      title={title}
      className={`${className} ${borders} bg-gray-100 dark:bg-zinc-900`}
      variant="text"
      icon={icon}
      onClick={onClick}
      disabled={disabled || navigator.clipboard == null}
    >
      {children}
    </Button>
  );
}

CopyToClipboardButton.propTypes = {
  children: Children,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  title: PropTypes.string,
};

CopyToClipboardButton.defaultProps = {
  children: null,
  className: '',
  disabled: true,
  value: null,
  title: null,
};

export default CopyToClipboardButton;
