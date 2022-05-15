import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { isAdmin } from '../store/reducers/accounts';

import Forbidden from '../pages/Forbidden';

export default function RequireAdmin({ children }) {
  const admin = useSelector(isAdmin);

  if (admin) {
    return children;
  }

  return <Forbidden />;
}

RequireAdmin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
