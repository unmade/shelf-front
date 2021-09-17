import React from 'react';

import { useSelector } from 'react-redux';

import { useHistory, useLocation } from 'react-router-dom';

import { getIsAuthenticated } from '../store/reducers/auth';

import * as icons from '../icons';

import LoginForm from '../containers/LoginForm';
import Toast from '../containers/Toast';
import ToastItem from '../containers/ToastItem';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const authenticated = useSelector(getIsAuthenticated);

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
        <div className="m-4 sm:m-0 bg-white max-w-md w-full py-12 px-6 rounded-2xl shadow">
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

Login.propTypes = {};

export default Login;
