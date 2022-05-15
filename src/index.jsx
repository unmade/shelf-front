import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './i18n';

import store from './store/store';

import Login from './pages/Login';

import App from './App';

import RequireAuth from './components/RequireAuth';

import './index.css';
import './tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route
            path="/*"
            element={
              <RequireAuth redirectTo="/signin">
                <App />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
