import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as routes from './routes';

import SideBar from './components/SideBar';
import FileBrowser from './containers/FileBrowser';
import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';
import Trash from './containers/Trash';

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 hidden lg:block py-4 text-gray-700">
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
