import React from 'react';
import PropTypes from 'prop-types';

import { BREADCRUMBS_ALIASES } from '../../../constants';
import * as icons from '../../../icons';

import Dropdown from '../Dropdown';
import Button from '../Button';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

const fonts = {
  xs: 'text-xs space-x-1',
  lg: 'text-xl space-x-2 font-semibold',
};

const iconSize = {
  xs: 'w-4 h-4',
  lg: 'w-5 h-5',
};

function breadcrumbsFromPath(path, aliases = BREADCRUMBS_ALIASES) {
  const breadcrumbs = [];
  const parts = path.split('/').filter((e) => e !== '');
  let prefix = '';
  parts.forEach((part) => {
    prefix = (part !== '.') ? `${prefix}/${part}` : part;
    breadcrumbs.push({
      path: prefix,
      name: (aliases && aliases[part]) || part,
    });
  });

  return breadcrumbs;
}

function Breadcrumb({
  size, path, collapsed, itemRender: Render, itemRenderCollapsed: RenderCollapsed,
}) {
  const items = breadcrumbsFromPath(path);

  if (!collapsed || items.length < 4) {
    return (
      <nav className={`min-w-0 flex flex-row items-center ${fonts[size]} text-gray-600`}>
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
    <nav className={`min-w-0 flex flex-row items-center ${fonts[size]} text-gray-600`}>
      <span className="max-w-xs truncate">
        <Render name={first.name} path={first.path} />
      </span>
      <div>
        <icons.ChevronRight />
      </div>
      <Dropdown
        overlay={() => (
          <div className="max-w-xs p-2 bg-white flex flex-col rounded shadow space-y-1">
            {(rest.map((item) => (
              <RenderCollapsed
                key={item.path}
                name={item.name}
                path={item.path}
              />
            )))}
          </div>
        )}
      >
        <Button
          type="text"
          size={size}
          icon={<icons.DotsHorizontal className={iconSize[size]} />}
        />
      </Dropdown>
      {(secondToLast !== null) && (
        <>
          <div>
            <icons.ChevronRight />
          </div>
          <span className="max-w-xs truncate">
            <Render name={secondToLast.name} path={secondToLast.path} />
          </span>
        </>
      )}
      <div>
        <icons.ChevronRight />
      </div>
      <span className="max-w-md truncate pr-8">
        <Render name={last.name} path={last.path} />
      </span>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.func.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  size: 'lg',
};

export default Breadcrumb;
