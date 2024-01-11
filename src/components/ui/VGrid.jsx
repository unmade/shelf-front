import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Spinner from './Spinner';

function VGrid({
  className,
  columnCount,
  innerRef,
  initialScrollOffset,
  itemData,
  loading,
  rowCount,
  rowHeightOffset,
  scrollKey,
  itemRenderer: View,
  onScrollOffsetChange,
}) {
  const shouldTrackScrolling = scrollKey != null && onScrollOffsetChange != null;

  const timeout = React.useRef(null);
  const onItemsRendered = React.useCallback(
    ({ visibleStartIndex }) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        if (visibleStartIndex !== initialScrollOffset) {
          onScrollOffsetChange({ key: scrollKey, offset: visibleStartIndex });
        }
      }, 200);
    },
    [initialScrollOffset, onScrollOffsetChange, timeout]
  );

  if (loading) {
    return <Spinner className="h-full w-full" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          ref={innerRef}
          className={className}
          columnCount={columnCount}
          columnWidth={width / columnCount}
          height={height}
          itemData={itemData}
          rowCount={rowCount}
          rowHeight={width / columnCount + rowHeightOffset}
          width={width}
          onItemsRendered={shouldTrackScrolling ? onItemsRendered : null}
        >
          {View}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}

VGrid.propTypes = {
  className: PropTypes.string,
  columnCount: PropTypes.number.isRequired,
  initialScrollOffset: PropTypes.number,
  itemData: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.any)]).isRequired,
  loading: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
  rowHeightOffset: PropTypes.number,
  scrollKey: PropTypes.string,
  itemRenderer: PropTypes.elementType.isRequired,
  onScrollOffsetChange: PropTypes.func,
};

VGrid.defaultProps = {
  className: '',
  initialScrollOffset: 0,
  loading: false,
  rowHeightOffset: 0,
  scrollKey: null,
  onScrollOffsetChange: null,
};

export default VGrid;
