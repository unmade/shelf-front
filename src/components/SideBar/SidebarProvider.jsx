import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Children, SidebarMenuItemShape } from '../../types';

const SidebarContext = createContext({ appTitle: null, appLogo: null, menu: [] });

function SidebarProvider({ children, appTitle, appLogo, menu }) {
  const value = useMemo(() => ({ appTitle, appLogo, menu }), [appTitle, appLogo, menu]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

SidebarProvider.propTypes = {
  children: Children.isRequired,
  appTitle: PropTypes.string.isRequired,
  appLogo: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(SidebarMenuItemShape).isRequired,
};

export default SidebarProvider;

export function useSidebarContext() {
  return useContext(SidebarContext);
}
