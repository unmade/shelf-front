import React from 'react';
import PropTypes from 'prop-types';

import { BreadcrumbShape } from '../../types';

import BrowserDataProvider from './BrowserDataProvider';
import StatusBar from './StatusBar';
import TableView from './TableView';

function Browser({
  breadcrumbs,
  droppable,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  ids,
  loading,
  selectById,
}) {
  return (
    <BrowserDataProvider ids={ids} loading={loading} selectById={selectById}>
      <div className="flex h-full flex-row overflow-scroll pt-4">
        <TableView
          droppable={droppable}
          emptyIcon={emptyIcon}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </div>
      <StatusBar breadcrumbs={breadcrumbs} />
    </BrowserDataProvider>
  );
}

Browser.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  droppable: PropTypes.bool,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

Browser.defaultProps = {
  droppable: false,
};

export default Browser;
