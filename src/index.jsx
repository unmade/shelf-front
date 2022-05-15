import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './i18n';

import store from './store/store';

import Login from './pages/Login';

import App from './App';

import './index.css';
import './tailwind.css';
import RequireAuth from './components/RequireAuth';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" exact>
            <Login />
          </Route>
          <Route path="/">
            <RequireAuth redirectTo="/signin">
              <App />
            </RequireAuth>
          </Route>
        </Switch>
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
