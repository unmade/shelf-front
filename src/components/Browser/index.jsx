import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { fileBrowserPathChanged } from '../../store/browser';

import { MediaQuery } from '../../constants';
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

  const isLaptop = useMediaQuery({ query: MediaQuery.lg });
  const path = dirPath ?? '.';

  useEffect(() => {
    dispatch(fileBrowserPathChanged({ path }));
  }, [path]);

  return (
    <DataProvider>
      <BrowserDataProvider dataContext={dataContext}>
        <div className="flex h-full flex-col">
          <BrowserHeader isLaptop={isLaptop} actionButton={actionButton} />
          <div className="flex h-full flex-row overflow-scroll pt-4">
            <TableView
              droppable={droppable}
              emptyIcon={emptyIcon}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
            />
          </div>
          <StatusBar breadcrumbs={breadcrumbs} dirPath={path} isLaptop={isLaptop} />
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
