import React from 'react';
import PropTypes from 'prop-types';

import * as icons from 'icons';
import { BreadcrumbShape } from 'types';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/ui/dropdown-menu';

import BreadcrumbItem from './BreadcrumbItem';

function Separator() {
  return (
    <div>
      <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
    </div>
  );
}

function Breadcrumb({
  className,
  items,
  collapseAfter,
  maxLastItems,
  itemRenderer: Render,
  itemRendererCollapsed: RenderCollapsed,
}) {
  const [first] = items;
  let lastItems = items.slice(Math.max(items.length - maxLastItems, 1), items.length);
  const toCollapse = items.slice(1, -maxLastItems);

  const shouldCollapse = toCollapse.length > collapseAfter;
  if (!shouldCollapse) {
    lastItems = [...toCollapse, ...lastItems];
  }

  const collapsed = shouldCollapse ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="focus:outline-none" size="icon-sm" variant="ghost">
          <icons.DotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start">
        {toCollapse.map((item) => (
          <DropdownMenuItem key={item.key}>
            <RenderCollapsed name={item.name} url={item.url} path={item.path} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;

  return (
    <nav
      className={`${className} flex items-center space-x-1 font-medium whitespace-nowrap text-gray-500 sm:space-x-4 dark:text-zinc-400`}
    >
      <Render name={first.name} url={first.url} path={first.path} />
      {shouldCollapse && (
        <>
          <Separator />
          {collapsed}
        </>
      )}
      {lastItems.map((item) => (
        <React.Fragment key={item.key}>
          <Separator />
          <Render name={item.name} url={item.url} path={item.path} />
        </React.Fragment>
      ))}
    </nav>
  );
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  collapseAfter: PropTypes.number,
  items: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  maxLastItems: PropTypes.number,
  itemRenderer: PropTypes.elementType.isRequired,
  itemRendererCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: '',
  collapseAfter: 2,
  maxLastItems: 2,
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
