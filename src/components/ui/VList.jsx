import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

function VList({
  className, heightOffset, items, itemHeight, itemRender: View,
}) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height - heightOffset}
          itemCount={items.length}
          itemData={items}
          itemSize={itemHeight}
          width={width}
          className={className}
        >
          {({ data, index, style }) => (
            <div style={style}>
              <View item={data[index]} className={(index % 2) ? 'bg-white' : 'bg-gray-75'} />
            </div>
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

VList.propTypes = {
  className: PropTypes.string,
  heightOffset: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemHeight: PropTypes.number,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

VList.defaultProps = {
  className: '',
  heightOffset: 0,
  itemHeight: 64,
};

export default VList;
