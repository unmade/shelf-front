import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './i18n';

import store from './store/store';

import * as routes from './routes';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import App from './App';

import RequireAuth from './components/RequireAuth';

import './index.css';
import './tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.SIGNIN.route} element={<SignIn />} />
          <Route path={routes.SIGNUP.route} element={<SignUp />} />
          <Route
            path="/*"
            element={
              <RequireAuth redirectTo={routes.SIGNIN.route}>
                <App />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
