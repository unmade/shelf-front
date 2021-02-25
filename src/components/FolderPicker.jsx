import React from 'react';
import PropTypes from 'prop-types';

import FolderPickerItem from '../containers/FolderPickerItem';

import Breadcrumbs from './ui/Breadcrumbs';
import List from './ui/List';

function FolderPicker({ path, items, onPathChange }) {
  return (
    <>
      <div className="pb-1">
        <Breadcrumbs
          size="small"
          path={(path.startsWith('.')) ? path : `./${path}`}
          itemRender={({ name, path: nextPath }) => (
            <button
              key={nextPath}
              type="button"
              className="font-semibold hover:text-blue-500"
              onClick={() => (
                onPathChange((nextPath === '.') ? nextPath : nextPath.substring(2, nextPath.length))
              )}
            >
              {name}
            </button>
          )}
        />
      </div>
      <List
        className="border rounded"
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
