import React from 'react';
import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';

import * as icons from '../icons';

import LoginForm from '../containers/LoginForm';
import Toast from '../containers/Toast';
import ToastItem from '../containers/ToastItem';

function Login({ authenticated }) {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (authenticated) {
      const redirectUrl = new URLSearchParams(location.search).get('next');
      if (redirectUrl) {
        history.push(redirectUrl);
      } else {
        history.push('/files');
      }
    }
  }, [authenticated, history, location]);

  return (
    <>
      <div className="min-h-screen flex items-end pb-20 sm:p-0 sm:items-center justify-center bg-gray-100">
        <div className="m-4 sm:m-0 bg-white max-w-md w-full py-12 px-6 rounded-md shadow">
          <div className="relative w-full inline-flex items-center space-x-4">
            <icons.AppLogo className="w-10 h-10 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-700">
              Shelf
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
      <Toast itemRender={ToastItem} />
    </>
  );
}

Login.propTypes = {
  authenticated: PropTypes.bool,
};

Login.defaultProps = {
  authenticated: false,
};

export default Login;
