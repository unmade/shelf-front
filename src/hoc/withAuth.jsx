import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getIsAuthenticated } from '../store/reducers/auth';

// eslint-disable-next-line func-names
export default function (Component) {
  return function AuthenticatedComponent(props) {
    const history = useHistory();
    const location = useLocation();
    const authenticated = useSelector(getIsAuthenticated);

    React.useEffect(() => {
      if (!authenticated) {
        const nextLocation = location.pathname !== '/' ? location.pathname : '/files';
        history.push(`/signin?next=${nextLocation}`);
      }
    }, [authenticated, location.pathname, history]);

    if (!authenticated) {
      return null;
    }

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} />
    );
  };
}
