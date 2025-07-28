import React from 'react';
import PropTypes from 'prop-types';

import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import { useGetCurrentAccountQuery } from '../store/accounts';
import { selectAccessToken, selectRefreshToken } from '../store/authSlice';

import Spinner from './ui/Spinner';

export default function RequireAccount({ children, redirectTo }) {
  const { pathname } = useLocation();

  const { currentData, isFetching, isLoading } = useGetCurrentAccountQuery();

  const to = `${redirectTo}?next=${pathname}`;

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  if (accessToken == null && refreshToken == null) {
    return <Navigate to={to} replace />;
  }

  const loading = isFetching || isLoading;
  if (loading || (accessToken != null && currentData == null)) {
    return <Spinner className="h-svh" />;
  }

  if (currentData == null) {
    return <Navigate to={to} replace />;
  }

  return children;
}

RequireAccount.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectTo: PropTypes.string.isRequired,
};
