import { Route, Routes } from 'react-router';

import * as routes from 'routes';

import { SidebarLayout } from '@/ui/sidebar-layout';

import AppNavbar from 'components/AppNavbar';
import AppSidebar from 'components/AppSidebar';

import Bookmarks from 'pages/Bookmarks';
// import Files from 'pages/Files';
import InAppSharing from 'pages/Shared/InApp';
import SharedLinks from 'pages/Shared/ViaLink';
import Trash from 'pages/Trash';

import appConfig from './config';

import Files from './pages/files';

export default function FilesApp() {
  return (
    <SidebarLayout sidebar={<AppSidebar app={appConfig} />} navbar={<AppNavbar />}>
      <Routes>
        <Route path={routes.BOOKMARKS.route} element={<Bookmarks />} />
        <Route path={routes.SHARED_IN_APP.route} element={<InAppSharing />} />
        <Route path={routes.SHARED_VIA_LINK.route} element={<SharedLinks />} />
        <Route path={routes.FILES.route} element={<Files />} />
        <Route path={routes.TRASH.route} element={<Trash />} />
      </Routes>
    </SidebarLayout>
  );
}
