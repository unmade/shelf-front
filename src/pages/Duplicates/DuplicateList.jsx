import React from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

import { FileShape } from '../../types';

function DuplicateList({ items, itemRenderer }) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current?.resetAfterIndex(0, false);
  }, [items]);

  // flatten the array
  const flatItems = React.useMemo(() => {
    const flatten = [];
    items?.forEach((group, i) => {
      flatten.push({ idx: i, type: 'header', value: i + 1 });
      group.forEach((file, j) => {
        flatten.push({ idx: j, type: 'row', value: file });
      });
    });
    return flatten;
  }, [items]);

  if (!flatItems.length) {
    return null;
  }

  const getItemSize = (index) => (flatItems[index].type === 'header' ? 36 : 74);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          ref={ref}
          height={height}
          itemCount={flatItems.length}
          itemData={flatItems}
          itemSize={getItemSize}
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
  items: PropTypes.arrayOf(PropTypes.arrayOf(FileShape.isRequired).isRequired).isRequired,
  itemRenderer: PropTypes.func.isRequired,
};
