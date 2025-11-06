import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router';

import { useAppDispatch } from 'hooks';
import { useDefaultApp } from 'hooks/available-apps';

import { featuresApi } from 'store/features';
import { usersApi } from 'store/users';

import filesConfig from 'apps/files/config';

import * as routes from './routes';

import RequireAdmin from './components/RequireAdmin';
import AppSidebar from './components/AppSidebar';
import { AppSidebarModalProvider } from './components/AppSidebarModal';

import Bookmarks from './pages/Bookmarks';
import Duplicates from './pages/Duplicates';
import Files from './pages/Files';
import InAppSharing from './pages/Shared/InApp';
import LinkSharing from './pages/Shared/ViaLink';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

import PhotosApp from 'apps/photos/app';

function FilesApp() {
  return (
    <AppSidebarModalProvider app={filesConfig}>
      <div className="hidden lg:block">
        <AppSidebar app={filesConfig} />
      </div>
      <div className="my-0 min-w-0 flex-1 bg-white shadow-sm dark:bg-zinc-800">
        <Routes>
          <Route path={routes.BOOKMARKS.route} element={<Bookmarks />} />
          <Route path={routes.SHARED_IN_APP.route} element={<InAppSharing />} />
          <Route path={routes.SHARED_VIA_LINK.route} element={<LinkSharing />} />
          <Route path={routes.DUPLICATES.route} element={<Duplicates />} />
          <Route path={routes.FILES.route} element={<Files />} />
          <Route path={routes.TRASH.route} element={<Trash />} />
          <Route
            path={routes.USER_MANAGEMENT.route}
            element={
              <RequireAdmin>
                <UserManagement />
              </RequireAdmin>
            }
          />
        </Routes>
      </div>
    </AppSidebarModalProvider>
  );
}

function App() {
  const dispatch = useAppDispatch();

  const defaultApp = useDefaultApp();

  useTranslation();

  React.useEffect(() => {
    const listBookmarksResult = dispatch(usersApi.endpoints.listBookmarks.initiate(undefined));
    const listFeaturesResult = dispatch(featuresApi.endpoints.listFeatures.initiate(undefined));
    return () => {
      listBookmarksResult.unsubscribe();
      listFeaturesResult.unsubscribe();
    };
  });

  return (
    <>
      <Helmet>
        <title>Shelf Cloud</title>
      </Helmet>
      <div className="flex h-svh bg-gray-100 dark:bg-zinc-900 dark:text-zinc-200">
        <Routes>
          <Route path={`${routes.PHOTOS.route}/*`} element={<PhotosApp />} />
          <Route path="/*" element={<FilesApp />} />
          {defaultApp.key === 'files' && (
            <Route path="/" element={<Navigate to={routes.FILES.prefix} replace />} />
          )}
          {defaultApp.key === 'photos' && (
            <Route path="/" element={<Navigate to={routes.PHOTOS.prefix} replace />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
