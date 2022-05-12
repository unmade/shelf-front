import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

import { getDuplicatesByPath } from '../../store/reducers/files';

function DuplicateList({ dirPath, itemRenderer }) {
  const ref = React.useRef();
  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));

  React.useEffect(() => {
    ref.current?.resetAfterIndex(0, false);
  }, [duplicates]);

  // flatten the array
  const items = React.useMemo(() => {
    const flatten = [];
    duplicates?.forEach((group, idx) => {
      flatten.push({ type: 'header', value: idx + 1 });
      group.forEach((fileId) => {
        flatten.push({ type: 'row', value: fileId });
      });
    });
    return flatten;
  }, [duplicates]);

  if (!items.length) {
    return null;
  }

  const getItemSize = (index) => (items[index].type === 'header' ? 28 : 74);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          ref={ref}
          height={height}
          itemCount={items.length}
          itemData={items}
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
  dirPath: PropTypes.string.isRequired,
  itemRenderer: PropTypes.func.isRequired,
};
