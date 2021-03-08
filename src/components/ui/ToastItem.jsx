import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

function ToastItem({ id, message, onClose }) {
  const { title, description } = message;
  return (
    <div className="p-4 bg-white flex flex-row shadow-md rounded-md">
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastItem;
