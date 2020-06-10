import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import SideMenu from './components/SideMenu';
import Files from './pages/Files';


class App extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout className="site-layout"> 
          <Route path="/" component={Files} />
        </Layout>
      </Layout>
    );
  }
}

export default App;
