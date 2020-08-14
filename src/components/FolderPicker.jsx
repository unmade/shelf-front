import React from 'react';
import PropTypes from 'prop-types';

import FolderPickerItem from '../containers/FolderPickerItem';

import Breadcrumbs from './Breadcrumbs';
import List from './List';

function breadcrumbsFromPath(path) {
  const breadcrumbs = [
    {
      path: '.',
      name: 'Home',
    },
  ];

  if (!path) {
    return breadcrumbs;
  }

  const parts = path.split('/').filter((e) => e !== '' && e !== '.');
  let prefix = null;
  parts.forEach((part) => {
    prefix = (prefix) ? `${prefix}/${part}` : part;
    breadcrumbs.push({
      path: prefix,
      name: part,
    });
  });

  return breadcrumbs;
}

function FolderPicker({ path, items, onPathChange }) {
  const breadcrumbs = breadcrumbsFromPath(path);

  return (
    <>
      <div className="pb-1">
        <Breadcrumbs size="small">
          {breadcrumbs.map(({ name, path: nextPath }) => (
            <button
              key={nextPath}
              type="button"
              className="font-semibold hover:text-blue-500"
              onClick={() => onPathChange(nextPath)}
            >
              {name}
            </button>
          ))}
        </Breadcrumbs>
      </div>
      <List
        className="border rounded"
        items={items}
        itemRender={({ item }) => (
          <FolderPickerItem item={item} onClick={onPathChange} />
        )}
      />
    </>
  );
}

FolderPicker.propTypes = {
  path: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPathChange: PropTypes.func.isRequired,
};

export default FolderPicker;
