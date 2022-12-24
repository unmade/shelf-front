import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { selectFileByIdInPath, useListFolderQuery } from '../store/files';

import { BreadcrumbShape } from '../types';

import Browser from '../components/Browser';

function BrowserContainer({ breadcrumbs, emptyView, path }) {
  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const selectById = useCallback((state, id) => selectFileByIdInPath(state, { path, id }), [path]);

  return (
    <Browser
      ids={ids}
      loading={loading && ids == null}
      selectById={selectById}
      breadcrumbs={breadcrumbs}
      emptyView={emptyView}
    />
  );
}

BrowserContainer.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  emptyView: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
};

export default BrowserContainer;
