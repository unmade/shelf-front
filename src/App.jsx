import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import SideMenu from './components/SideMenu';
import FileBrowser from './pages/Files';


class App extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout> 
          <Switch>
            <Route path="/files/:dirPath*" component={FileBrowser} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}

export default App;
