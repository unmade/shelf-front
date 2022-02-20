import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

import { getDuplicatesByPath } from '../store/reducers/files';

function DuplicateList({ dirPath, itemRenderer }) {
  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));
  if (!duplicates?.length) {
    return null;
  }

  // flatten the array
  const items = [];
  duplicates.forEach((group, idx) => {
    items.push({ type: 'header', value: idx + 1 });
    group.forEach((fileId) => {
      items.push({ type: 'row', value: fileId });
    });
  });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          height={height}
          itemCount={items.length}
          itemData={items}
          itemSize={(index) => (items[index].type === 'header' ? 29 : 73)}
          width={width}
        >
          {itemRenderer}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
}

export default DuplicateList;

DuplicateList.propTypes = {
  dirPath: PropTypes.string.isRequired,
  itemRenderer: PropTypes.func.isRequired,
};
