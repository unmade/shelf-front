import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { usersApi } from './store/users';

import * as routes from './routes';

import usePrefersColorScheme from './hooks/prefers-color-scheme';

import RequireAdmin from './components/RequireAdmin';
import SideBar from './components/SideBar';

import Bookmarks from './pages/Bookmarks';
import Duplicates from './pages/Duplicates';
import Files from './pages/Files';
import InAppSharing from './pages/Shared/InApp';
import LinkSharing from './pages/Shared/ViaLink';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

function App() {
  const dispatch = useDispatch();

  usePrefersColorScheme();

  React.useEffect(() => {
    const listBookmarksResult = dispatch(usersApi.endpoints.listBookmarks.initiate());
    return () => {
      listBookmarksResult.unsubscribe();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Shelf</title>
      </Helmet>
      <div className="flex h-screen bg-gray-100 dark:bg-zinc-900 dark:text-zinc-200">
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
      </div>
    </>
  );
}

export default App;
