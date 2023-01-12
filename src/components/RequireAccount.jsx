import React from 'react';
import PropTypes from 'prop-types';

import { Navigate, useLocation } from 'react-router-dom';

import { useGetCurrentAccountQuery } from '../store/accounts';
import Spinner from './ui/Spinner';

export default function RequireAccount({ children, redirectTo }) {
  const { pathname } = useLocation();

  const { currentData, isLoading: loading } = useGetCurrentAccountQuery();

  if (loading) {
    return <Spinner className="h-screen" />;
  }

  if (currentData == null) {
    const to = `${redirectTo}?next=${pathname}`;
    return <Navigate to={to} replace />;
  }

  return children;
}

RequireAccount.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectTo: PropTypes.string.isRequired,
};
