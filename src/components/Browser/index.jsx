import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fileBrowserPathChanged } from '../../store/browser';

import { BreadcrumbShape } from '../../types';

import BrowserDataProvider from './BrowserDataProvider';
import StatusBar from './StatusBar';
import TableView from './TableView';

function Browser({
  breadcrumbs,
  dirPath,
  droppable,
  dataProvider: DataProvider,
  dataContext,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}) {
  const dispatch = useDispatch();

  const path = dirPath ?? '.';

  useEffect(() => {
    dispatch(fileBrowserPathChanged({ path }));
  }, [path]);

  return (
    <DataProvider>
      <BrowserDataProvider dataContext={dataContext}>
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-row overflow-scroll pt-4">
            <TableView
              droppable={droppable}
              emptyIcon={emptyIcon}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
            />
          </div>
          <StatusBar breadcrumbs={breadcrumbs} />
        </div>
      </BrowserDataProvider>
    </DataProvider>
  );
}

export default Browser;

Browser.propTypes = {
  breadcrumbs: PropTypes.arrayOf(BreadcrumbShape).isRequired,
  dirPath: PropTypes.string,
  droppable: PropTypes.bool,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

Browser.defaultProps = {
  dirPath: null,
  droppable: false,
};
