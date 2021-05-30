import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as routes from './routes';

import withAdmin from './hoc/withAdmin';

import SideBar from './containers/SideBar';
import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';

import Files from './pages/Files';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="hidden lg:block w-64">
          <SideBar />
        </div>
        <div className="min-w-0 my-0 bg-white flex-1 shadow-sm">
          <Switch>
            <Route path={routes.FILES.route} component={Files} />
            <Route path={routes.TRASH.route} component={Trash} />
            <Route path={routes.USER_MANAGEMENT.route} component={withAdmin(UserManagement)} />
          </Switch>
        </div>
      </div>

      <Toast itemRender={ToastItem} />
    </>
  );
}

export default App;
