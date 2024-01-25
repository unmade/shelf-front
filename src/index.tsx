import React from 'react';

import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './i18n';

import store from './store/store';
import { featuresApi } from './store/features';

import * as routes from './routes';

import SharedLinkFile from './pages/SharedLinkFile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import RequireAccount from './components/RequireAccount';
import ToastListContainer from './components/ui/Toast/ToastListContainer';

import App from './App';

import './index.css';
import './tailwind.css';

declare global {
  interface ImportMeta {
    hot: {
      accept: () => void;
      dispose: () => void;
    };
    env: {
      MODE: string;
      SNOWPACK_PUBLIC_MODE: string;
      SNOWPACK_PUBLIC_REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA: string;
      SNOWPACK_PUBLIC_TRASH_FOLDER_NAME: string;
    };
  }
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

store.dispatch(featuresApi.endpoints.listFeatures.initiate(undefined));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastListContainer>
          <BrowserRouter>
            <Routes>
              <Route path={routes.SIGNIN.route} element={<SignIn />} />
              <Route path={routes.SIGNUP.route} element={<SignUp />} />
              <Route path={routes.SHARED_LINK_FILE.route} element={<SharedLinkFile />} />
              <Route
                path="/*"
                element={
                  <RequireAccount redirectTo={routes.SIGNIN.route}>
                    <App />
                  </RequireAccount>
                }
              />
            </Routes>
          </BrowserRouter>
        </ToastListContainer>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
