import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import { getIsAuthenticated } from '../store/reducers/auth';

import * as icons from '../icons';

import LoginForm from '../containers/LoginForm';
import Toast from '../containers/Toast';
import ToastItem from '../containers/ToastItem';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = useSelector(getIsAuthenticated);

  React.useEffect(() => {
    if (authenticated) {
      const redirectUrl = new URLSearchParams(location.search).get('next');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/files');
      }
    }
  }, [authenticated, navigate, location]);

  return (
    <>
      <div className="flex min-h-screen items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0">
        <div className="m-4 w-full max-w-md rounded-2xl bg-white py-12 px-6 shadow sm:m-0">
          <div className="relative inline-flex w-full items-center space-x-4">
            <icons.AppLogo className="h-10 w-10 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-700">Shelf</h1>
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
