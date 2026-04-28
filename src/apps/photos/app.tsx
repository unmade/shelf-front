import { Route, Routes } from 'react-router';

import * as routes from 'routes';

import { SidebarLayout } from '@/ui/sidebar-layout';

import AppNavbar from 'components/AppNavbar';
import AppSidebar from 'components/AppSidebar';

import appConfig from './config';
import Album from './pages/album';
import Albums from './pages/albums';
import Favourites from './pages/favourites';
import Library from './pages/library';
import Trash from './pages/trash';

export default function App() {
  return (
    <SidebarLayout sidebar={<AppSidebar app={appConfig} />} navbar={<AppNavbar />}>
      <Routes>
        <Route path={routes.PHOTOS_ALBUMS.route} element={<Albums />} />
        <Route path={routes.PHOTOS_ALBUMS_ALBUM.route} element={<Album />} />
        <Route path={routes.PHOTOS_FAVOURITES.route} element={<Favourites />} />
        <Route path={routes.TRASH.route} element={<Trash />} />
        <Route path="/*" element={<Library />} />
      </Routes>
    </SidebarLayout>
  );
}
