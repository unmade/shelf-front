import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

function VList({
  className,
  heightOffset,
  initialScrollOffset,
  itemHeight,
  items,
  scrollKey,
  trackScrolling,
  itemRender: View,
  setScrollOffset,
}) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          initialScrollOffset={itemHeight * initialScrollOffset}
          height={height - heightOffset}
          itemCount={items.length}
          itemData={items}
          itemSize={itemHeight}
          width={width}
          className={className}
          useIsScrolling={trackScrolling}
          onItemsRendered={({ visibleStartIndex }) => {
            if (
              scrollKey !== null && scrollKey !== undefined
              && setScrollOffset !== null && setScrollOffset !== undefined
            ) {
              setScrollOffset(scrollKey, visibleStartIndex);
            }
          }}
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
  initialScrollOffset: PropTypes.number,
  itemHeight: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  trackScrolling: PropTypes.bool,
  scrollKey: PropTypes.string,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  setScrollOffset: PropTypes.func,
};

VList.defaultProps = {
  className: '',
  heightOffset: 0,
  initialScrollOffset: 0,
  itemHeight: 64,
  scrollKey: null,
  trackScrolling: false,
  setScrollOffset: null,
};

export default VList;
