import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

function Dialog({
  children,
  title,
  icon,
  visible,
  confirmTitle,
  confirmDanger,
  onConfirm,
  onCancel,
}) {
  const iconColors = (confirmDanger) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500';
  return (
    <Modal visible={visible} onClose={onCancel}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          {(icon) && (
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${iconColors} sm:mx-0 sm:h-10 sm:w-10`}>
              {icon}
            </div>
          )}

          {(title) && (
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {(onConfirm) && (
          <div className="w-full sm:w-auto sm:ml-3">
            <Button
              type="primary"
              onClick={onConfirm}
              danger={confirmDanger}
              full
            >
              {confirmTitle}
            </Button>
          </div>
        )}
        {(onCancel) && (
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-3">
            <Button
              type="default"
              onClick={onCancel}
              full
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

Dialog.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  visible: PropTypes.bool,
  confirmTitle: PropTypes.string,
  confirmDanger: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Dialog.defaultProps = {
  title: '',
  icon: null,
  visible: false,
  confirmTitle: 'OK',
  confirmDanger: false,
  onConfirm: null,
  onCancel: null,
};

export default Dialog;
