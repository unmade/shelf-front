import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { Children } from '../../types';

const BrowserDataContext = createContext(null);

function BrowserDataProvider({ children, ids, loading, selectById }) {
  return (
    <BrowserDataContext.Provider value={{ ids, loading, selectById }}>
      {children}
    </BrowserDataContext.Provider>
  );
}

BrowserDataProvider.propTypes = {
  children: Children.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  selectById: PropTypes.func.isRequired,
};

BrowserDataProvider.defaultProps = {
  ids: null,
  loading: false,
};

export default BrowserDataProvider;

export function useBrowserData() {
  return useContext(BrowserDataContext);
}
