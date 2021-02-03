import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TRASH_FOLDER_NAME } from './constants';

import SideMenu from './components/SideMenu';
import FileBrowser from './containers/FileBrowser';
import Trash from './containers/Trash';

function App() {
  return (
    <div className="flex md:flex-row-reverse flex-wrap h-screen bg-gray-200">
      <div className="w-5/6 my-0 mx-auto bg-white border-l">
        <Switch>
          <Route path={`/files/${TRASH_FOLDER_NAME}/:dirPath*`} component={Trash} />
          <Route path="/files/:dirPath*" component={FileBrowser} />
        </Switch>
      </div>

      <div className="w-full md:w-1/6 p-4 text-gray-700">
        <SideMenu />
      </div>
    </div>
  );
}

export default App;
