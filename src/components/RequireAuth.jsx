import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { signedOut } from '../store/actions/auth';
import { getIsAuthenticated } from '../store/reducers/auth';

export default function RequireAuth({ children, redirectTo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authenticated = useSelector(getIsAuthenticated);

  React.useEffect(() => {
    if (!authenticated) {
      dispatch(signedOut());
      navigate(`${redirectTo}?next=${pathname}`);
    }
  }, [authenticated, pathname, dispatch, navigate]);

  if (!authenticated) {
    return null;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectTo: PropTypes.string.isRequired,
};
