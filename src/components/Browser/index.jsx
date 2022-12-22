import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fileBrowserPathChanged } from '../../store/browser';

import { BreadcrumbShape } from '../../types';

import BrowserDataProvider from './BrowserDataProvider';
import BrowserHeader from './Header';
import TableView from './TableView';
import StatusBar from './StatusBar';

function Browser({
  actionButton,
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
          <BrowserHeader actionButton={actionButton} />
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
  actionButton: PropTypes.func.isRequired,
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
