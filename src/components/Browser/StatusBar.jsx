import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFilesCountByPath } from '../../store/reducers/files';

import Breadcrumb from '../ui/Breadcrumb';

function StatusBar({ breadcrumbs, dirPath, isLaptop, withCreateFolder }) {
  const count = useSelector((state) => getFilesCountByPath(state, dirPath));
  return (
    <div className="bottom-0 w-full pl-6 pr-8 py-1 flex items-center justify-center lg:justify-between border-t bg-gray-50 text-xs text-center text-gray-400">
      {(isLaptop) && (
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
      )}
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
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dirPath: PropTypes.string,
  isLaptop: PropTypes.bool,
  withCreateFolder: PropTypes.bool,
};

StatusBar.defaultProps = {
  dirPath: '.',
  isLaptop: false,
  withCreateFolder: false,
};
