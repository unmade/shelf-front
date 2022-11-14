import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

import Button from './Button';

function ToastItem({ id, message, onClose }) {
  const { title, description, closeAfter } = message;

  React.useEffect(() => {
    if (closeAfter != null) {
      const interval = setInterval(() => {
        onClose(id);
      }, closeAfter * 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return null;
  }, [id, closeAfter, onClose]);

  return (
    <div className="mb-4 flex animate-toast-in-right flex-row rounded-xl bg-white p-4 shadow-md dark:bg-zinc-800 dark:shadow-zinc-900/50">
      <div className="p-1">
        <icons.CloseCirle className="h-5 w-5 text-rose-500" />
      </div>

      <div className="w-64 p-1 px-3 text-sm">
        <p className="font-semibold text-gray-800 dark:text-zinc-200">{title}</p>
        <p className="pt-1 text-gray-600 dark:text-zinc-400">{description}</p>
      </div>

      <div>
        <Button
          type="text"
          icon={<icons.Close className="h-4 w-4 text-gray-600 dark:text-zinc-400" />}
          title="Close"
          onClick={() => onClose(id)}
        />
      </div>
    </div>
  );
}

ToastItem.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    closeAfter: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastItem;
