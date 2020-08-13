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

function FolderPicker({ path, items, onBreadcrumbClick, onPathChange }) {
  const breadcrumbs = breadcrumbsFromPath(path);

  React.useEffect(() => {
    onPathChange(path);
  }, [path]);

  return (
    <>
      <div className="pb-1">
        <Breadcrumbs size="small">
          {breadcrumbs.map(({ name, path: nextPath }) => (
            <button
              key={nextPath}
              type="button"
              className="font-semibold hover:text-blue-500"
              onClick={() => onBreadcrumbClick(nextPath)}
            >
              {name}
            </button>
          ))}
        </Breadcrumbs>
      </div>
      <List
        className="border rounded"
        items={items}
        itemRender={FolderPickerItem}
      />
    </>
  );
}

FolderPicker.propTypes = {
  path: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  onBreadcrumbClick: PropTypes.func.isRequired,
  onPathChange: PropTypes.func.isRequired,
};

export default FolderPicker;
