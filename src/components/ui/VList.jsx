import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import * as icons from '../../icons';

function VList({
  className,
  heightOffset,
  initialScrollOffset,
  itemCount,
  itemData,
  itemHeight,
  loading,
  scrollKey,
  trackScrolling,
  itemRender: View,
  setScrollOffset,
}) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        if (loading) {
          return (
            <div
              className={`flex flex-col items-center justify-center ${className}`}
              style={{ height: height - heightOffset, width }}
            >
              <icons.Spinner className="h-7 w-7 animate-spin text-gray-600" />
            </div>
          );
        }
        return (
          <FixedSizeList
            initialScrollOffset={itemHeight * initialScrollOffset}
            height={height - heightOffset}
            itemCount={itemCount}
            itemData={itemData}
            itemSize={itemHeight}
            width={width}
            className={className}
            useIsScrolling={trackScrolling}
            onItemsRendered={({ visibleStartIndex }) => {
              if (scrollKey != null && setScrollOffset != null) {
                setScrollOffset(scrollKey, visibleStartIndex);
              }
            }}
          >
            {View}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  );
}

VList.propTypes = {
  className: PropTypes.string,
  heightOffset: PropTypes.number,
  initialScrollOffset: PropTypes.number,
  itemCount: PropTypes.number.isRequired,
  itemData: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.any)]).isRequired,
  itemHeight: PropTypes.number,
  loading: PropTypes.bool,
  trackScrolling: PropTypes.bool,
  scrollKey: PropTypes.string,
  itemRender: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setScrollOffset: PropTypes.func,
};

VList.defaultProps = {
  className: '',
  heightOffset: 0,
  initialScrollOffset: 0,
  itemHeight: 64,
  loading: false,
  scrollKey: null,
  trackScrolling: false,
  setScrollOffset: null,
};

export default VList;
