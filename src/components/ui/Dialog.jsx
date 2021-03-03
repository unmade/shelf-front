import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

function Dialog({
  children,
  title,
  icon,
  visible,
  confirmTitle,
  confirmColor,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} onClose={onCancel}>
      <div className="max-w-md bg-white rounded-lg overflow-hidden z-50">
        <div className="flex flex-row p-4">
          {(icon) && (
            <div className="w-12 h-12 mr-4 flex items-center justify-center bg-gray-75 rounded-full">
              {icon}
            </div>
          )}

          <div className="flex-1">
            {(title) && (
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
            )}
            {children}
          </div>
        </div>

        <div className="bg-gray-75 px-4 py-3 sm:flex sm:flex-row-reverse">
          {(onConfirm) && (
            <span className="flex w-full rounded-md shadow-sm sm:ml-2 sm:w-auto">
              <button
                type="button"
                className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-1 bg-${confirmColor}-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-${confirmColor}-500 focus:outline-none focus:ring-red transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
                onClick={onConfirm}
              >
                {confirmTitle}
              </button>
            </span>
          )}
          {(onCancel) && (
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-1 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={onCancel}
              >
                Cancel
              </button>
            </span>
          )}
        </div>

      </div>
    </Modal>
  );
}

Dialog.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  visible: PropTypes.bool,
  confirmTitle: PropTypes.string,
  confirmColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Dialog.defaultProps = {
  title: '',
  icon: null,
  visible: false,
  confirmTitle: 'OK',
  confirmColor: 'blue',
  onConfirm: null,
  onCancel: null,
};

export default Dialog;