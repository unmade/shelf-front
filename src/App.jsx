import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideMenu from './components/SideMenu';
import FileBrowser from './containers/FileBrowser';

function App() {
  return (
    <div className="flex md:flex-row-reverse flex-wrap h-screen bg-gray-200">
      <div className="w-5/6 my-0 mx-auto bg-white border-l">
        <Switch>
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
