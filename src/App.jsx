import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as routes from './routes';

import SideMenu from './components/SideMenu';
import FileBrowser from './containers/FileBrowser';
import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';
import Trash from './containers/Trash';

function App() {
  return (
    <>
      <div className="flex md:flex-row-reverse flex-wrap h-screen bg-gray-200">
        <div className="w-5/6 my-0 mx-auto bg-white border-l">
          <Switch>
            <Route path={routes.FILES.route} component={FileBrowser} />
            <Route path={routes.TRASH.route} component={Trash} />
          </Switch>
        </div>

        <div className="w-full md:w-1/6 p-4 text-gray-700">
          <SideMenu />
        </div>
      </div>

      <Toast itemRender={ToastItem} />
    </>
  );
}

export default App;
