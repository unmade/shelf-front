import React from 'react';
import PropTypes from 'prop-types';

import FolderPickerItem from '../containers/FolderPickerItem';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

const HEIGHT = 24;

const changePath = (path, onPathChange) => (event) => {
  event.preventDefault();
  event.stopPropagation();
  const nextPath = (path === '.') ? path : path.substring(2, path.length);
  onPathChange(nextPath);
};

function FolderPicker({ path, items, listFolder, onPathChange }) {
  React.useEffect(() => {
    listFolder(path);
  }, [path, listFolder]);

  return (
    <>
      <div className="pb-1">
        <Breadcrumb
          size="xs"
          path={(path.startsWith('.')) ? path : `./${path}`} // add './' to build correct breadcrumbs
          itemRender={({ name, path: nextPath }) => (
            <Breadcrumb.Item
              path={nextPath}
              onClick={changePath(nextPath, onPathChange)}
              isActive={() => nextPath === path || nextPath === `./${path}`}
            >
              {name}
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, path: nextPath }) => (
            <Breadcrumb.ItemCollapsed
              path={nextPath}
              onClick={changePath(nextPath, onPathChange)}
              isActive={() => false}
            >
              {name}
            </Breadcrumb.ItemCollapsed>
          )}
          collapsed
        />
      </div>
      <VList
        className="border rounded"
        heightOffset={HEIGHT}
        items={items}
        itemRender={({ className, item }) => (
          <FolderPickerItem className={className} item={item} onClick={onPathChange} />
        )}
      />
    </>
  );
}

FolderPicker.propTypes = {
  path: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPathChange: PropTypes.func.isRequired,
};

export default FolderPicker;
