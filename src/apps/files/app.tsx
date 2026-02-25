import { Route, Routes } from 'react-router';

import * as routes from 'routes';

import { SidebarLayout } from '@/ui/sidebar-layout';

import AppNavbar from 'components/AppNavbar';
import AppSidebar from 'components/AppSidebar';

import appConfig from './config';

import Bookmarks from './pages/bookmarks';
import Files from './pages/files';
import SharedFiles from './pages/shared-files';
import SharedLinks from './pages/shared-links';
import Trash from './pages/trash';

export default function FilesApp() {
  return (
    <SidebarLayout sidebar={<AppSidebar app={appConfig} />} navbar={<AppNavbar />}>
      <Routes>
        <Route path={routes.BOOKMARKS.route} element={<Bookmarks />} />
        <Route path={routes.SHARED_IN_APP.route} element={<SharedFiles />} />
        <Route path={routes.SHARED_VIA_LINK.route} element={<SharedLinks />} />
        <Route path={routes.FILES.route} element={<Files />} />
        <Route path={routes.TRASH.route} element={<Trash />} />
      </Routes>
    </SidebarLayout>
  );
}
