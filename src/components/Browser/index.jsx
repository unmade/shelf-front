import React from 'react';
import PropTypes from 'prop-types';

import { BreadcrumbShape } from '../../types';

import BrowserDataProvider from './BrowserDataProvider';
import StatusBar from './StatusBar';
import TableView from './TableView';

function Browser({ breadcrumbs, droppable, emptyView, ids, loading, selectById }) {
  if (ids?.length != null && ids?.length === 0 && !loading) {
    return emptyView;
  }

  return (
    <BrowserDataProvider ids={ids} loading={loading} selectById={selectById}>
      <div className="flex h-full flex-row overflow-scroll pt-4">
        <TableView droppable={droppable} />
      </div>
      <StatusBar breadcrumbs={breadcrumbs} />
    </BrowserDataProvider>
  );
}

Browser.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  droppable: PropTypes.bool,
  emptyView: PropTypes.element.isRequired,
};

Browser.defaultProps = {
  droppable: false,
};

export default Browser;
