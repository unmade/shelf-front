import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router';

import { useAppDispatch } from 'hooks';
import { useDefaultApp } from 'hooks/available-apps';

import { featuresApi } from 'store/features';
import { usersApi } from 'store/users';

import * as routes from './routes';

import FilesApp from 'apps/files/app';
import PhotosApp from 'apps/photos/app';

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
