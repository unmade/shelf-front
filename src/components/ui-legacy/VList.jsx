import React from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Spinner from 'components/ui/Spinner';

function VList({
  className,
  heightOffset,
  initialScrollOffset,
  itemCount,
  itemData,
  itemHeight,
  loading,
  scrollKey,
  itemRender: View,
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
    [initialScrollOffset, onScrollOffsetChange, timeout],
  );

  if (loading) {
    return <Spinner className="h-full w-full" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          initialScrollOffset={itemHeight * initialScrollOffset}
          height={height - heightOffset}
          itemCount={itemCount}
          itemData={itemData}
          itemSize={itemHeight}
          width={width}
          className={className}
          onItemsRendered={shouldTrackScrolling ? onItemsRendered : null}
        >
          {View}
        </FixedSizeList>
      )}
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
  scrollKey: PropTypes.string,
  itemRender: PropTypes.elementType.isRequired,
  onScrollOffsetChange: PropTypes.func,
};

VList.defaultProps = {
  className: '',
  heightOffset: 0,
  initialScrollOffset: 0,
  itemHeight: 64,
  loading: false,
  scrollKey: null,
  onScrollOffsetChange: null,
};

export default VList;
