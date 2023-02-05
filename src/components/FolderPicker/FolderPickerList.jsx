import React from 'react';
import PropTypes from 'prop-types';

import { useListFolderQuery } from '../../store/files';

import Spinner from '../ui/Spinner';
import VList from '../ui/VList';

import FolderPickerItem from './FolderPickerItem';

function FolderPickerList({ className, emptyView, path, excludeIds, onItemClick }) {
  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const items = React.useMemo(() => {
    if (excludeIds.length) {
      const idsToExclude = new Set(excludeIds);
      return ids?.filter((id) => !idsToExclude.has(id));
    }
    return ids;
  }, [ids, excludeIds]);

  const data = {
    items,
    path,
    onClick: onItemClick,
  };

  if (loading) {
    return <Spinner className="flex-1" />;
  }

  if (!loading && ids != null && ids.length === 0) {
    return emptyView;
  }

  return (
    <VList
      className={className}
      itemCount={items?.length ?? 0}
      itemData={data}
      loading={loading}
      itemRender={FolderPickerItem}
    />
  );
}

FolderPickerList.propTypes = {
  className: PropTypes.string,
  emptyView: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  excludeIds: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func.isRequired,
};

FolderPickerList.defaultProps = {
  className: '',
  excludeIds: [],
};

export default FolderPickerList;
