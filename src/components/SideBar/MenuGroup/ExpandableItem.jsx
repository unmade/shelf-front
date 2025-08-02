import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router';

import Disclosure from '../../ui-legacy/Disclosure';
import Dropdown from '../../ui-legacy/Dropdown';

import Item from './Item';

function Overlay({ items }) {
  return (
    <div className="ml-3 rounded-2xl px-4 py-3 text-base dark:bg-zinc-900">
      {items.map((item) => (
        <NavLink key={item.path} to={item.path}>
          {({ isActive }) => (
            <Item title={<span className="px-2">{item.title}</span>} active={isActive} />
          )}
        </NavLink>
      ))}
    </div>
  );
}

Overlay.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function ExpandableItem({ title, icon, items }) {
  return (
    <>
      <Disclosure
        className="w-full lg:hidden xl:block"
        title={<Item title={title} icon={icon} />}
        panel={
          <div className="mx-3">
            {items.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <Item title={<span className="ml-5">{item.title}</span>} active={isActive} />
                )}
              </NavLink>
            ))}
          </div>
        }
      />
      <div className="hidden lg:block xl:hidden">
        <Dropdown placement="right" overlay={<Overlay items={items} />}>
          <div>
            <Item title={title} icon={icon} />
          </div>
        </Dropdown>
      </div>
    </>
  );
}

ExpandableItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ExpandableItem;
