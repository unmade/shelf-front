import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import Disclosure from '../ui/Disclosure';

const defaultClassNames =
  'flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200 lg:p-2.5 xl:py-2 xl:px-3';
const activeClassNames = 'bg-gray-200 text-gray-700 dark:bg-zinc-700/50 dark:text-zinc-400';

function classNameFactory({ isActive }) {
  return `${defaultClassNames} ${isActive ? activeClassNames : ''}`;
}

function MenuGroup({ items }) {
  return items.map((item) => (
    <div key={item.path} className={item.desktopOnly ? 'hidden lg:block' : 'block'}>
      <div className="mx-3">
        {item.items ? (
          <Disclosure
            className={`${defaultClassNames} w-full`}
            title={
              <div>
                <div className="mx-0 flex lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
                  <div>{item.icon}</div>
                  <div className="block lg:hidden xl:block">{item.title}</div>
                </div>
              </div>
            }
            panel={
              <div className="group/sidemenu">
                <MenuGroup items={item.items} />
              </div>
            }
          />
        ) : (
          <NavLink to={item.path} className={classNameFactory}>
            <div className="mx-0 flex lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
              <div>{item.icon}</div>
              <div className="block lg:hidden xl:block group-odd/sidemenu:ml-5">{item.title}</div>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  ));
}

const MenuItemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.element,
  desktopOnly: PropTypes.bool.isRequired,
});
MenuItemType.items = PropTypes.arrayOf(MenuItemType);

MenuGroup.propTypes = {
  items: PropTypes.arrayOf(MenuItemType).isRequired,
};

export default MenuGroup;
