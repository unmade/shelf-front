import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { openDialog } from '../../../store/actions/ui';

import { Dialogs } from '../../../constants';
import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../Button';
import Menu from '../Menu';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

function Breadcrumb({
  className, path, withCreateFolder, itemRender: Render, itemRenderCollapsed: RenderCollapsed,
}) {
  const dispatch = useDispatch();
  const items = routes.breadcrumbs(path);
  const onCreateFolder = () => dispatch(openDialog(Dialogs.createFolder));
  if (items.length < 4) {
    return (
      <nav className={`${className} flex items-center text-gray-500 font-medium space-x-1 sm:space-x-4 whitespace-nowrap`}>
        {items.map((item, idx) => (
          <React.Fragment key={item.path}>
            {(idx !== 0) && (
              <icons.ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
            )}
            <span className="max-w-xs truncate flex items-center">
              {(idx === 0) && (
                <span className="py-2 sm:py-1">
                  <icons.Home className="w-4 h-4 mr-2 flex-shrink-0 text-gray-300" />
                </span>
              )}
              <Render name={item.name} path={item.path} />
            </span>
          </React.Fragment>
        ))}
        {(withCreateFolder) && (
          <>
            <icons.ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
            <button
              type="button"
              className="p-2 sm:p-1 text-gray-400 hover:bg-teal-50 hover:text-blue-400 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-teal-200"
              onClick={onCreateFolder}
            >
              <icons.NewFolder className="w-4 h-4" />
            </button>
          </>
        )}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();

  return (
    <nav className={`${className} flex items-center text-gray-500 font-medium space-x-1 sm:space-x-4 whitespace-nowrap`}>
      <span className="max-w-xs flex items-center">
        <icons.Home className="w-4 h-4 mr-2 flex-shrink-0 text-gray-300" />
        <Render name={first.name} path={first.path} />
      </span>
      <div>
        <icons.ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
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
        <icons.ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
      </div>
      <span className="max-w-2xs sm:max-w-2xs">
        <Render name={last.name} path={last.path} />
      </span>
      {(withCreateFolder) && (
        <>
          <icons.ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
          <button
            type="button"
            className="p-2 sm:p-1 text-gray-400 hover:bg-teal-50 hover:text-blue-400 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-teal-200"
            onClick={onCreateFolder}
          >
            <icons.NewFolder className="w-4 h-4 flex-shrink-0" />
          </button>
        </>
      )}
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.func.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: '',
};

export default Breadcrumb;
