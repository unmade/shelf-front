import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectIsAdmin } from '../store/accounts';

import Forbidden from '../pages/Forbidden';

export default function RequireAdmin({ children }) {
  const admin = useSelector(selectIsAdmin);

  if (admin) {
    return children;
  }

  return <Forbidden />;
}

RequireAdmin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
