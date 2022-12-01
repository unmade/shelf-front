import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../../constants';

import BrowserHeader from './Header';
import BrowserContainer from './BrowserContainer';
import StatusBar from './StatusBar';

function Browser({ actionButton, dirPath, droppable, emptyIcon, emptyTitle, emptyDescription }) {
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });
  const path = dirPath ?? '.';

  return (
    <div className="flex h-full flex-col">
      <BrowserHeader isLaptop={isLaptop} actionButton={actionButton} />
      <div className="flex h-full flex-row overflow-scroll pt-4">
        <BrowserContainer
          dirPath={dirPath}
          droppable={droppable}
          emptyIcon={emptyIcon}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </div>
      <StatusBar dirPath={path} isLaptop={isLaptop} />
    </div>
  );
}

export default Browser;

Browser.propTypes = {
  actionButton: PropTypes.func.isRequired,
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
