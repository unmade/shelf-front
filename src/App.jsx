import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideMenu from './components/SideMenu';
import FileBrowser from './pages/Files';


class App extends React.Component {
  render() {
    return (
      <div className="flex md:flex-row-reverse flex-wrap h-screen">
        <div className="w-full md:w-4/5 p-2">
          <Switch>
            <Route path="/files/:dirPath*" component={FileBrowser} />
          </Switch>
        </div>

        <div className="w-full md:w-1/5 bg-gray-400 p-4 text-gray-700">
          <SideMenu />
        </div>
      </div>
    );
  }
}

export default App;
