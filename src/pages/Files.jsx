import React from 'react';
import { Layout } from 'antd';
import Files from '../containers/Files';
import FilesSider from '../components/FilesSider';

const { Content } = Layout;


function FileBrowser() {
  return ( 
    <Layout style={{ background: 'white' }}>
      <Content style={{ margin: '0 16px' }}>
        <Files />
      </Content>
      {/* <FilesSider /> */}

    </Layout>
  );
}


export default FileBrowser;
