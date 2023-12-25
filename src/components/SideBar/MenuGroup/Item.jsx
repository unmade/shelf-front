import React from 'react';
import PropTypes from 'prop-types';

const defaultClassNames =
  'flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200 lg:p-2.5 xl:py-2 xl:px-3';
const activeClassNames = 'bg-gray-200 text-gray-700 dark:bg-zinc-700/50 dark:text-zinc-400';

function Item({ title, icon, active }) {
  return (
    <div className={`${defaultClassNames} ${active ? activeClassNames : ''}`}>
      <div className="mx-0 flex lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
        {icon && <div>{icon}</div>}
        <div className={`block ${icon != null && 'lg:hidden'} xl:block group-odd/sidemenu:ml-5`}>
          {title}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  active: PropTypes.bool,
};

Item.defaultProps = {
  icon: null,
  active: false,
};

export default Item;
