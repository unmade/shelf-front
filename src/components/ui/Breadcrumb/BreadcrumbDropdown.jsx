import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';

function BreadcrumbDropdown({ children, items, itemRender: Render }) {
  return (
    <Dropdown
      overlay={() => (
        <div className="max-w-xs">
          <div className="m-2 sm:m-0 p-2 bg-white flex flex-col rounded shadow space-y-1">
            {(items.map((item) => (
              <Render key={item.path} name={item.name} path={item.path} />
            )))}
          </div>
        </div>
      )}
    >
      {children}
    </Dropdown>
  );
}

BreadcrumbDropdown.propTypes = {
  children: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  itemRender: PropTypes.func.isRequired,
};

export default BreadcrumbDropdown;
