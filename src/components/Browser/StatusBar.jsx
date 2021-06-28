import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getCountSelectedFiles, getFilesCountByPath } from '../../store/reducers/files';

import Breadcrumb from '../ui/Breadcrumb';

function TotalFiles({ dirPath }) {
  const totalCount = useSelector((state) => getFilesCountByPath(state, dirPath));
  const selectedCount = useSelector(getCountSelectedFiles);
  if (selectedCount === 0) {
    return `${totalCount} items`;
  }
  return `${selectedCount} of ${totalCount} selected`;
}

function StatusBar({ dirPath, isLaptop, withCreateFolder }) {
  return (
    <div className="bottom-0 w-full pl-6 pr-8 py-1 flex items-center justify-center lg:justify-between border-t bg-gray-50 text-xs text-center text-gray-400">
      {(isLaptop) && (
        <Breadcrumb
          path={dirPath}
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
        <TotalFiles dirPath={dirPath} />
      </div>
    </div>
  );
}

export default StatusBar;

StatusBar.propTypes = {
  dirPath: PropTypes.string,
  isLaptop: PropTypes.bool,
  withCreateFolder: PropTypes.bool,
};

StatusBar.defaultProps = {
  dirPath: '.',
  isLaptop: false,
  withCreateFolder: false,
};
