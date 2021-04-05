import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

function VList({
  className, heightOffset, itemHeight, items, trackScrolling, itemRender: View,
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
          useIsScrolling={trackScrolling}
        >
          {({ data, index, isScrolling, style }) => (
            <div style={style}>
              <View
                className={(index % 2) ? 'bg-white' : 'bg-gray-75'}
                item={data[index]}
                scrolling={isScrolling}
              />
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
  itemHeight: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  trackScrolling: PropTypes.bool,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

VList.defaultProps = {
  className: '',
  heightOffset: 0,
  itemHeight: 64,
  trackScrolling: false,
};

export default VList;
