import React from 'react';
import PropTypes from 'prop-types';

function Toast({ messages, itemRender: Render }) {
  if (messages.length < 1) {
    return null;
  }
  return (
    <div className="fixed top-2 right-2 z-50 m-2">
      {messages.map((messageId) => (
        <Render key={messageId} id={messageId} />
      ))}
    </div>
  );
}

Toast.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  itemRender: PropTypes.elementType.isRequired,
};

export default Toast;
