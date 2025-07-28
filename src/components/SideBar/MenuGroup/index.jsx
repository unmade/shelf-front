import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router';

import { SidebarMenuItemShape } from '../../../types';

import ExpandableItem from './ExpandableItem';
import Item from './Item';

function MenuGroupItem({ item }) {
  const { title, path, icon, items, end } = item;
  if (items) {
    return <ExpandableItem title={title} icon={icon} items={items} />;
  }

  return (
    <NavLink to={path} end={end}>
      {({ isActive }) => <Item title={title} icon={icon} active={isActive} />}
    </NavLink>
  );
}

MenuGroupItem.propTypes = {
  item: SidebarMenuItemShape.isRequired,
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
  items: PropTypes.arrayOf(SidebarMenuItemShape).isRequired,
};

export default MenuGroup;
