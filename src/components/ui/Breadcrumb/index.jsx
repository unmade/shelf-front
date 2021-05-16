import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../icons';

import Button from '../Button';
import Menu from '../Menu';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

function Breadcrumb({
  className, items, itemRender: Render, itemRenderCollapsed: RenderCollapsed,
}) {
  if (items.length < 4) {
    return (
      <nav className={`${className} flex items-center text-gray-500 text-sm font-medium space-x-1 sm:space-x-2 whitespace-nowrap`}>
        {items.map((item, idx) => (
          <React.Fragment key={item.path}>
            {(idx !== 0) && (
              <icons.ChevronRight className="w-4 h-4 sm:block flex-none text-gray-300" />
            )}
            {(idx === 0) && (
              <div className="py-2 sm:py-1">
                <icons.Home className="w-4 h-4 sm:block flex-none text-gray-300" />
              </div>
            )}
            <span className="max-w-xs truncate">
              <Render name={item.name} path={item.path} />
            </span>
          </React.Fragment>
        ))}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();

  return (
    <nav className={`${className} flex items-center text-gray-500 text-sm font-medium space-x-1 sm:space-x-2 whitespace-nowrap`}>
      <icons.Home className="w-4 h-4 sm:block flex-none text-gray-300" />
      <span className="max-w-xs">
        <Render name={first.name} path={first.path} />
      </span>
      <div>
        <icons.ChevronRight />
      </div>
      <Menu
        panelClassName="max-w-xs"
        items={rest}
        itemRender={({ item }) => (
          <RenderCollapsed name={item.name} path={item.path} />
        )}
      >
        <Button
          as="div"
          type="text"
          size="sm"
          icon={<icons.DotsHorizontal className="w-4 h-4" />}
        />
      </Menu>
      <div>
        <icons.ChevronRight />
      </div>
      <span className="max-w-2xs">
        <Render name={last.name} path={last.path} />
      </span>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  itemRender: PropTypes.func.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: '',
};

export default Breadcrumb;
