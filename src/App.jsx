import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { featuresApi } from './store/features';
import { usersApi } from './store/users';

import filesMenu from './filesMenu';
import * as icons from './icons';
import photosMenu from './photosMenu';
import * as routes from './routes';

import usePrefersColorScheme from './hooks/prefers-color-scheme';

import RequireAdmin from './components/RequireAdmin';
import SideBar from './components/SideBar';
import SidebarProvider from './components/SideBar/SidebarProvider';

import Bookmarks from './pages/Bookmarks';
import Duplicates from './pages/Duplicates';
import Files from './pages/Files';
import InAppSharing from './pages/Shared/InApp';
import LinkSharing from './pages/Shared/ViaLink';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

import Photos from './pages/Photos';
import PhotosFavourites from './pages/Photos/Favourites';
import PhotosSharedLinks from './pages/Photos/SharedLinks';

function FilesApp() {
  return (
    <SidebarProvider appTitle="shelf" appLogo={icons.AppLogo} menu={filesMenu}>
      <div className="hidden lg:block xl:w-64">
        <SideBar />
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
          <Route path="/" element={<Navigate to={routes.FILES.prefix} replace />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
}

function PhotosApp() {
  return (
    <SidebarProvider appTitle="shelf" appLogo={icons.AppLogo} menu={photosMenu}>
      <div className="hidden lg:block xl:w-64">
        <SideBar />
      </div>
      <div className="my-0 min-w-0 flex-1 bg-white shadow-sm dark:bg-zinc-800">
        <Routes>
          <Route path={routes.PHOTOS_FAVOURITES.route} element={<PhotosFavourites />} />
          <Route path={routes.PHOTOS_SHARED_VIA_LINK.route} element={<PhotosSharedLinks />} />
          <Route path="/*" element={<Photos />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
}

function App() {
  const dispatch = useDispatch();

  usePrefersColorScheme();

  React.useEffect(() => {
    const listBookmarksResult = dispatch(usersApi.endpoints.listBookmarks.initiate());
    const listFeaturesResult = dispatch(featuresApi.endpoints.listFeatures.initiate());
    return () => {
      listBookmarksResult.unsubscribe();
      listFeaturesResult.unsubscribe();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Shelf</title>
      </Helmet>
      <div className="flex h-svh bg-gray-100 dark:bg-zinc-900 dark:text-zinc-200">
        <Routes>
          <Route path={`${routes.PHOTOS.route}/*`} element={<PhotosApp />} />
          <Route path="/*" element={<FilesApp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
