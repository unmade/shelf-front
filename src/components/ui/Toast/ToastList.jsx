import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ToastShape } from '../../../types';

function ToastList({ items, itemRenderer: Render, onClose }) {
  if (items.length < 1) {
    return null;
  }

  return createPortal(
    <div className="fixed top-2 right-2 m-2 z-40">
      {items.map((toast) => (
        <Render key={toast.id} item={toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
}

ToastList.propTypes = {
  items: PropTypes.arrayOf(ToastShape).isRequired,
  itemRenderer: PropTypes.elementType.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastList;
