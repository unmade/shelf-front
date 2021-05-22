import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as routes from './routes';

import FileBrowser from './containers/FileBrowser';
import SideBar from './containers/SideBar';

import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';
import Trash from './containers/Trash';

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <div className="hidden sm:block w-64">
          <SideBar />
        </div>
        <div className="my-0 bg-white flex-1 shadow-sm">
          <Switch>
            <Route path={routes.FILES.route} component={FileBrowser} />
            <Route path={routes.TRASH.route} component={Trash} />
          </Switch>
        </div>
      </div>

      <Toast itemRender={ToastItem} />
    </>
  );
}

export default App;
