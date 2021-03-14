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
  return (
    <Modal visible={visible} onClose={onCancel}>
      <div className="max-w-lg bg-white rounded-lg overflow-hidden z-50">
        <div className="w-full p-4 inline-flex space-x-4">
          {(icon) && (
            <div>
              <div className={`p-3 rounded-full ${(confirmDanger) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                {icon}
              </div>
            </div>
          )}

          {(title) && (
            <div className="w-full flex flex-col">
              <h3 className="py-3 text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
              {children}
            </div>
          )}
        </div>

        <div className="w-full bg-gray-100 px-4 py-3 space-x-2 text-right">
          {(onCancel) && (
            <Button
              type="default"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          {(onConfirm) && (
            <Button
              type="primary"
              onClick={onConfirm}
              danger={confirmDanger}
            >
              {confirmTitle}
            </Button>
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
