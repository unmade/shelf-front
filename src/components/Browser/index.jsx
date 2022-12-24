import React from 'react';
import PropTypes from 'prop-types';

import { BreadcrumbShape } from '../../types';

import BrowserDataProvider from './BrowserDataProvider';
import StatusBar from './StatusBar';
import TableView from './TableView';

function Browser({ breadcrumbs, emptyView, ids, loading, selectById }) {
  const empty = ids?.length != null && ids?.length === 0 && !loading;

  return (
    <BrowserDataProvider ids={ids} loading={loading} selectById={selectById}>
      {empty ? emptyView : <TableView />}
      <StatusBar breadcrumbs={breadcrumbs} />
    </BrowserDataProvider>
  );
}

Browser.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  emptyView: PropTypes.element.isRequired,
};

export default Browser;
