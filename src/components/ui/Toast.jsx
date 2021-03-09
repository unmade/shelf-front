import React from 'react';
import PropTypes from 'prop-types';

function Toast({ messages, itemRender: Render }) {
  return (
    <div className="m-2 fixed top-2 right-2 z-50">
      {messages.map((messageId) => (
        <Render
          key={messageId}
          id={messageId}
        />
      ))}
    </div>
  );
}

Toast.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default Toast;
