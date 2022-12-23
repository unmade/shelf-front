import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Button from './ui/Button';

import FileLink from './FileLink';

function GoBackButton({ to, disabled }) {
  const button = (
    <Button
      disabled={disabled}
      type="text"
      icon={
        <icons.ArrowLeft
          className={`h-7 w-7 ${disabled ? 'text-gray-400 dark:text-zinc-500' : ''}`}
        />
      }
    />
  );
  if (disabled) {
    return button;
  }
  return (
    <FileLink className="h-9 w-9" path={to}>
      {button}
    </FileLink>
  );
}

GoBackButton.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GoBackButton;
