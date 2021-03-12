import React from 'react';
import PropTypes from 'prop-types';

import Button from './ui/Button';

function ActionsMenu({ menu }) {
  const onClickFactory = (onClick) => (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div className="p-2 flex flex-col space-y-1 text-sm text-gray-700 bg-white rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          onClick={onClickFactory(item.onClick)}
          danger={item.danger}
        >
          <div className="w-full flex flex-row items-center justify-between space-x-4">
            <span>{item.name}</span>
            <span>{item.icon}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}

ActionsMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]).isRequired,
      icon: PropTypes.element.isRequired,
      onClick: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ActionsMenu;
