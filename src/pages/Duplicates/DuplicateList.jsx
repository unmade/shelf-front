import React from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

import { FileShape } from '../../types';

function DuplicateList({ data, itemRenderer }) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current?.resetAfterIndex(0, false);
  }, [data.items]);

  // flatten the array
  const flatItems = React.useMemo(() => {
    const flatten = [];
    data.items?.forEach((group, i) => {
      flatten.push({ type: 'header', idx: i, groupId: i, value: i + 1 });
      group.forEach((file, j) => {
        flatten.push({ type: 'row', idx: j, groupId: i, value: file });
      });
    });
    return flatten;
  }, [data.items]);

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
          itemData={{ ...data, items: flatItems }}
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
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.arrayOf(FileShape.isRequired).isRequired).isRequired,
    selectedId: PropTypes.string,
    onItemClick: PropTypes.func.isRequired,
  }).isRequired,
  itemRenderer: PropTypes.elementType.isRequired,
};
