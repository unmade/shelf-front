import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import * as routes from '../routes';

import FolderPickerItem from '../containers/FolderPickerItem';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px`,
};

const changePath = (path, onPathChange) => (event) => {
  event.preventDefault();
  event.stopPropagation();
  const nextPath = (path === '.') ? path : path.substring(2, path.length);
  onPathChange(nextPath);
};

function norm(path) {
  return (path.startsWith('.')) ? path : `./${path}`; // add './' to build correct breadcrumbs
}

const FolderPicker = React.memo(({
  items, loading, path, listFolder, onPathChange,
}) => {
  React.useEffect(() => {
    listFolder(path);
  }, [path, listFolder]);

  return (
    <>
      <div className="pb-1">
        <Breadcrumb
          items={routes.breadcrumbs(norm(path))}
          fold={Breadcrumb.Fold.collapse}
          size="xs"
          itemRender={({ name, path: nextPath }) => (
            <Breadcrumb.Item
              path={nextPath}
              onClick={changePath(nextPath, onPathChange)}
              isActive={() => nextPath === path || nextPath === `./${path}`}
            >
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, path: nextPath }) => (
            <Breadcrumb.ItemCollapsed
              path={nextPath}
              onClick={changePath(nextPath, onPathChange)}
              isActive={() => false}
            >
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.ItemCollapsed>
          )}
        />
      </div>
      {(items.length || loading) ? (
        <VList
          className="border rounded"
          heightOffset={HEIGHT}
          items={items}
          loading={items.length === 0 && loading}
          itemRender={({ className, item }) => (
            <FolderPickerItem className={className} item={item} onClick={onPathChange} />
          )}
        />
      ) : (
        <div className="flex flex-col items-center justify-center border rounded" style={height}>
          <div className="text-center">
            <icons.Collection className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-800 text-lg font-semibold">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-600">
              Move file here
            </p>
          </div>
        </div>
      )}

    </>
  );
});

FolderPicker.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  path: PropTypes.string.isRequired,
  onPathChange: PropTypes.func.isRequired,
};

FolderPicker.defaultProps = {
  loading: true,
};

export default FolderPicker;
