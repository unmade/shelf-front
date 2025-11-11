import { Route, Routes } from 'react-router';

import * as routes from 'routes';

import SidebarLayout from 'components/ui/SidebarLayout';

import AppNavbar from 'components/AppNavbar';
import AppSidebar from 'components/AppSidebar';

import Bookmarks from 'pages/Bookmarks';
import Duplicates from 'pages/Duplicates';
import Files from 'pages/Files';
import InAppSharing from 'pages/Shared/InApp';
import LinkSharing from 'pages/Shared/ViaLink';
import Trash from 'pages/Trash';

import appConfig from './config';

export default function FilesApp() {
  return (
    <SidebarLayout sidebar={<AppSidebar app={appConfig} />} navbar={<AppNavbar />}>
      <Routes>
        <Route path={routes.BOOKMARKS.route} element={<Bookmarks />} />
        <Route path={routes.SHARED_IN_APP.route} element={<InAppSharing />} />
        <Route path={routes.SHARED_VIA_LINK.route} element={<LinkSharing />} />
        <Route path={routes.DUPLICATES.route} element={<Duplicates />} />
        <Route path={routes.FILES.route} element={<Files />} />
        <Route path={routes.TRASH.route} element={<Trash />} />
      </Routes>
    </SidebarLayout>
  );
}
