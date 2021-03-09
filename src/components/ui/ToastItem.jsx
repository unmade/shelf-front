import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

function ToastItem({ id, message, onClose }) {
  const { title, description, closeAfter } = message;

  React.useEffect(() => {
    if (closeAfter !== null && closeAfter !== undefined) {
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
    <div className="mb-4 p-4 bg-white flex flex-row shadow-md rounded-md animate-toast-in-right">
      <div className="p-1">
        <icons.CloseCirle className="w-5 h-5 text-red-500" />
      </div>

      <div className="p-1 w-64 px-3 text-sm">
        <p className="text-gray-800 font-semibold">
          {title}
        </p>
        <p className="pt-1 text-gray-600">
          {description}
        </p>
      </div>

      <div>
        <button
          type="button"
          title="Close"
          className="p-1 hover:bg-gray-100 rounded-md"
          onClick={() => onClose(id)}
        >
          <icons.Close className="text-gray-600" />
        </button>
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
