import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import ExpandableItem from './ExpandableItem';
import Item from './Item';

const MenuItemType = PropTypes.shape({
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  desktopOnly: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
});

function MenuGroupItem({ item }) {
  const { title, path, icon, items } = item;
  if (items) {
    return <ExpandableItem title={title} icon={icon} items={items} />;
  }

  return (
    <NavLink to={path}>
      {({ isActive }) => <Item title={title} icon={icon} active={isActive} />}
    </NavLink>
  );
}

MenuGroupItem.propTypes = {
  item: MenuItemType.isRequired,
};

function MenuGroup({ items }) {
  return items.map((item) => (
    <div key={item.path} className={item.desktopOnly ? 'hidden lg:block' : 'block'}>
      <div className="mx-3">
        <MenuGroupItem item={item} />
      </div>
    </div>
  ));
}

MenuGroup.propTypes = {
  items: PropTypes.arrayOf(MenuItemType).isRequired,
};

export default MenuGroup;
