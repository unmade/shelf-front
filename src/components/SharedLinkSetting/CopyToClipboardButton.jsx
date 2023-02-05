import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import Button from '../ui/Button';

const PENDING = 'pending';
const COPIED = 'copied';

function CopyToClipboardButton({ text, disabled }) {
  const { t } = useTranslation();

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
    if (text != null && text !== '') {
      navigator.clipboard?.writeText(text);
    }
    setState(COPIED);
  };

  const icon =
    state === COPIED ? (
      <icons.Check className="h-5 w-7 shrink-0 text-teal-400 dark:text-teal-500" />
    ) : (
      <icons.ClipboardCopyOutlined className="h-5 w-7 shrink-0 text-gray-400 dark:text-zinc-400" />
    );

  const borders =
    state === COPIED
      ? 'focus:ring-teal-300 border-teal-200 dark:focus:ring-teal-700 dark:border-teal-600 z-30'
      : '';

  return (
    <Button
      title={t('Copy to clipboard')}
      className={borders}
      type="default"
      icon={icon}
      onClick={onClick}
      disabled={disabled || navigator.clipboard == null}
    />
  );
}

CopyToClipboardButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

CopyToClipboardButton.defaultProps = {
  text: null,
  disabled: true,
};

export default CopyToClipboardButton;