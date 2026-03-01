import React from 'react';

import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import '@/i18n';

import store from '@/store/store';
import { featuresApi } from '@/store/features';

import * as routes from '@/routes';

import { Toaster } from '@/ui/sonner';

import OTPVerification from '@/pages/EmailVerification';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

import SharedLinkFile from '@/apps/files/pages/shared-link-file';

import AppearanceProvider from '@/components/AppearanceProvider';
import RequireAccount from '@/components/RequireAccount';

import App from './App';

import './index.css';
import './tailwind.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

store.dispatch(featuresApi.endpoints.listFeatures.initiate(undefined));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppearanceProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path={routes.SIGNIN.route} element={<SignIn />} />
              <Route path={routes.SIGNUP.route} element={<SignUp />} />
              <Route path={routes.SHARED_LINK_FILE.route} element={<SharedLinkFile />} />
              <Route
                path={routes.EMAIL_VERIFICATION.route}
                element={
                  <RequireAccount redirectTo={routes.SIGNIN.route}>
                    <OTPVerification />
                  </RequireAccount>
                }
              />
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
          <Toaster position="bottom-center" richColors />
        </HelmetProvider>
      </AppearanceProvider>
    </Provider>
  </React.StrictMode>,
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
