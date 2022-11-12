import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import * as routes from './routes';

import RequireAdmin from './components/RequireAdmin';
import SideBar from './components/SideBar';

import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';

import Bookmarks from './pages/Bookmarks';
import Duplicates from './pages/Duplicates';
import Files from './pages/Files';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <>
      <div className="shelf-h-screen flex bg-gray-100 dark:bg-zinc-900 dark:text-zinc-200">
        <div className="hidden lg:block xl:w-64">
          <SideBar />
        </div>
        <div className="my-0 min-w-0 flex-1 bg-white shadow-sm dark:bg-zinc-800">
          <Routes>
            <Route path={routes.BOOKMARKS.route} element={<Bookmarks />} />
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

      <Toast itemRender={ToastItem} />
    </>
  );
}

export default App;
