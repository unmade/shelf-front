import React from 'react';
import PropTypes from 'prop-types';

import { BREADCRUMBS_ALIASES } from '../../../constants';
import * as icons from '../../../icons';

import Dropdown from '../Dropdown';
import Button from '../Button';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

const fonts = {
  sm: 'text-xs space-x-1',
  lg: 'text-xl space-x-2 font-semibold',
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
  size, path, collapsed, itemRender: Render, itemRenderCollapse: RenderCollapse,
}) {
  const items = breadcrumbsFromPath(path);

  if (!collapsed || items.length < 3) {
    return (
      <nav className={`flex flex-row items-center ${fonts[size]} text-gray-600`}>
        {(items.map((item, idx) => (
          <React.Fragment key={item.path}>
            <Render name={item.name} path={item.path} />
            {(idx !== (items.length - 1)) && (
              <icons.ChevronRight />
            )}
          </React.Fragment>
        )))}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();
  return (
    <nav className={`min-w-0 flex flex-row items-center ${fonts[size]} text-gray-600`}>
      <Render name={first.name} path={first.path} />
      <div>
        <icons.ChevronRight />
      </div>
      <Dropdown
        overlay={() => (
          <div className="p-2 bg-white flex flex-col rounded shadow space-y-1">
            {(rest.map((item) => (
              <RenderCollapse
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
          icon={<icons.DotsHorizontal className="w-5 h-5" />}
        />
      </Dropdown>
      <div>
        <icons.ChevronRight />
      </div>
      <span className="w-full truncate pr-8">
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
  itemRenderCollapse: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  size: 'lg',
};

export default Breadcrumb;
