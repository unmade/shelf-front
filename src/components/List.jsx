import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const HEADER_HEIGHT = 0;

function List({ className, items, itemHeight, itemRender: View }) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height - HEADER_HEIGHT}
          itemCount={items.length}
          itemData={items}
          itemSize={itemHeight}
          width={width}
          className={className}
        >
          {({ data, index, style }) => (
            <div style={style}>
              <div className={`h-full ${(index % 2) ? 'bg-white' : 'bg-gray-75'}`}>
                <View item={data[index]} />
              </div>
            </div>
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

List.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemHeight: PropTypes.number,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

List.defaultProps = {
  className: '',
  itemHeight: 64,
};

export default List;
