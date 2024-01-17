import React from 'react';
import PropTypes from 'prop-types';

const iconClassName = 'mr-3 h-5 w-5 shrink-0 lg:mx-auto lg:h-6 lg:w-6 xl:mr-3 xl:h-5 xl:w-5';

const defaultClassNames =
  'flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200 lg:p-2.5 xl:py-2 xl:px-3';
const activeClassNames = 'bg-gray-200 text-gray-700 dark:bg-zinc-700/50 dark:text-zinc-400';

function Item({ title, icon: Icon, active }) {
  return (
    <div className={`${defaultClassNames} ${active ? activeClassNames : ''}`}>
      <div className="mx-0 flex lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
        {Icon && (
          <div>
            <Icon className={iconClassName} />
          </div>
        )}
        <div className={`block ${Icon != null && 'lg:hidden'} group-odd/sidemenu:ml-5 xl:block`}>
          {title}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  active: PropTypes.bool,
};

Item.defaultProps = {
  icon: null,
  active: false,
};

export default Item;
