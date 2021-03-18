import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../icons';

import Button from '../Button';

import BreadcrumbDropdown from './BreadcrumbDropdown';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

const fonts = {
  xs: 'text-xs space-x-1',
  lg: 'text-xl space-x-2 font-semibold',
};

const iconSize = {
  xs: 'text-base',
  lg: 'text-lg',
};

function Breadcrumb({
  collapsed, items, single, size, itemRender: Render, itemRenderCollapsed: RenderCollapsed,
}) {
  if (single) {
    const last = items.pop();
    if (items.length < 1) {
      return (
        <Button
          type="text"
          size={size}
          full
          disabled
        >
          <Render name={last.name} path={last.path} />
        </Button>
      );
    }
    return (
      <BreadcrumbDropdown items={items} itemRender={RenderCollapsed}>
        <Button type="text" size={size} full>
          <Render name={last.name} path={last.path} />
        </Button>
      </BreadcrumbDropdown>
    );
  }

  if (!collapsed || items.length < 4) {
    return (
      <nav className={`flex flex-row items-center ${fonts[size]} text-gray-600`}>
        {(items.map((item, idx) => (
          <React.Fragment key={item.path}>
            {(idx !== 0) && (
              <icons.ChevronRight />
            )}
            <span className="py-1 max-w-xs truncate">
              <Render name={item.name} path={item.path} />
            </span>
          </React.Fragment>
        )))}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();
  let secondToLast = null;
  if (size !== 'xs') {
    secondToLast = rest.pop();
  }
  return (
    <nav className={`flex flex-row items-center ${fonts[size]} text-gray-600`}>
      <span className="max-w-xs">
        <Render name={first.name} path={first.path} />
      </span>
      <div>
        <icons.ChevronRight />
      </div>
      <BreadcrumbDropdown items={rest} itemRender={RenderCollapsed}>
        <Button
          type="text"
          size={size}
          icon={<icons.DotsHorizontal className={iconSize[size]} />}
        />
      </BreadcrumbDropdown>
      {(secondToLast !== null) && (
        <>
          <div>
            <icons.ChevronRight />
          </div>
          <span className="max-w-2xs">
            <Render name={secondToLast.name} path={secondToLast.path} />
          </span>
        </>
      )}
      <div>
        <icons.ChevronRight />
      </div>
      <span className="min-w-0 max-w-md pr-8">
        <Render name={last.name} path={last.path} />
      </span>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  collapsed: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  single: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'lg']),
  itemRender: PropTypes.func.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  collapsed: false,
  single: false,
  size: 'lg',
};

export default Breadcrumb;