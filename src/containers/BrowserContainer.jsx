import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fileBrowserPathChanged } from '../store/browser';
import { selectFileByIdInPath, useListFolderQuery } from '../store/files';

import { BreadcrumbShape } from '../types';

import Browser from '../components/Browser';

function BrowserContainer({ breadcrumbs, emptyView, droppable, path }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fileBrowserPathChanged({ path }));
  }, [path]);

  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const selectById = useCallback((state, id) => selectFileByIdInPath(state, { path, id }), [path]);

  return (
    <Browser
      ids={ids}
      loading={loading}
      selectById={selectById}
      breadcrumbs={breadcrumbs}
      droppable={droppable}
      emptyView={emptyView}
    />
  );
}

BrowserContainer.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  emptyView: PropTypes.element.isRequired,
  droppable: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

BrowserContainer.defaultProps = {
  droppable: false,
};

export default BrowserContainer;
