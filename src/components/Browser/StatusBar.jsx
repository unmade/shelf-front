import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { getFilesCountByPath } from '../../store/reducers/files';

import * as routes from '../../routes';

import Breadcrumb from '../ui/Breadcrumb';

function StatusBar({ dirPath, withCreateFolder }) {
  const count = useSelector((state) => getFilesCountByPath(state, dirPath));
  const match = useRouteMatch();
  const breadcrumbs = routes.breadcrumbs(match.url);
  return (
    <div className="bottom-0 w-full pl-6 pr-8 py-1 flex items-center justify-between border-t bg-gray-50 text-xs text-center text-gray-400">
      <Breadcrumb
        items={breadcrumbs}
        itemRender={({ name, path }) => (
          <Breadcrumb.Item path={path}>
            <span className="block truncate">
              {name}
            </span>
          </Breadcrumb.Item>
        )}
        itemRenderCollapsed={({ name, path }) => (
          <Breadcrumb.ItemCollapsed path={path}>
            <span className="block truncate">
              {name}
            </span>
          </Breadcrumb.ItemCollapsed>
        )}
        withCreateFolder={withCreateFolder}
      />
      <div>
        {count}
        &nbsp;
        items
      </div>
    </div>
  );
}

export default StatusBar;

StatusBar.propTypes = {
  dirPath: PropTypes.string,
  withCreateFolder: PropTypes.bool,
};

StatusBar.defaultProps = {
  dirPath: '.',
  withCreateFolder: false,
};
