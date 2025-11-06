import { Route, Routes } from 'react-router';

import * as routes from 'routes';

import SidebarLayout from 'components/ui/SidebarLayout';

import AppNavbar from 'components/AppNavbar';
import AppSidebar from 'components/AppSidebar';

import Library from 'pages/Photos/Library';
import Albums from 'pages/Photos/Albums';
import Album from 'pages/Photos/Album';
import Favourites from 'pages/Photos/Favourites';
import SharedLinks from 'pages/Photos/SharedLinks';
import Trash from 'pages/Photos/Trash';

import appConfig from './config';

export default function App() {
  return (
    <SidebarLayout sidebar={<AppSidebar app={appConfig} />} navbar={<AppNavbar />}>
      <Routes>
        <Route path={routes.PHOTOS_ALBUMS.route} element={<Albums />} />
        <Route path={routes.PHOTOS_ALBUMS_ALBUM.route} element={<Album />} />
        <Route path={routes.PHOTOS_FAVOURITES.route} element={<Favourites />} />
        <Route path={routes.PHOTOS_SHARED_VIA_LINK.route} element={<SharedLinks />} />
        <Route path={routes.TRASH.route} element={<Trash />} />
        <Route path="/*" element={<Library />} />
      </Routes>
    </SidebarLayout>
  );
}
