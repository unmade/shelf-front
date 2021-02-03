import React from 'react';
import PropTypes from 'prop-types';

function ActionsMenu({ menu }) {
  const onClickFactory = (onClick) => (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div className="flex flex-col text-sm text-gray-700 p-2 bg-white py-2 rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="rounded px-4 py-2 hover:bg-gray-100"
          onClick={onClickFactory(item.onClick)}
        >
          <div className="flex flex-row items-center justify-between space-x-4">
            <p className="text-left pr-4">
              {item.name}
            </p>
            {item.icon}
          </div>
        </button>
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
