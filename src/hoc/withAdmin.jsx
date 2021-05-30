import React from 'react';

import { useSelector } from 'react-redux';

import { isAdmin } from '../store/reducers/accounts';

import Forbidden from '../pages/Forbidden';

export default function (Component) {
  return function AdminComponent(props) {
    const admin = useSelector(isAdmin);

    if (admin) {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props} />
      );
    }

    // return null;
    return <Forbidden />;
  };
}
