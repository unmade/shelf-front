import React from 'react';

import {
  Button,
  Layout,
  Menu,
} from 'antd';

import {
  BookOutlined,
  CameraOutlined,
  CloudUploadOutlined,
  CompassOutlined,
  FileSearchOutlined,
  PictureOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;


const SideMenu = () => ( 
  <Sider 
    theme="light"
    width={250}
    style={{
      borderRight: "1px solid #f0f0f0",
    }}
  >
    <div className="logo" />
    <Button
      type="primary"
      shape="round"
      icon={<CloudUploadOutlined />}
      size="large"
      style={{margin: '20px 10px'}}
    >
      Upload
    </Button>
    <Menu theme="light" defaultSelectedKeys={['4']} mode="inline" style={{border: 'none'}}>
      <Menu.Item key="1" icon={<PictureOutlined />}>
        All Photos
      </Menu.Item>
      <Menu.Item key="7" icon={<BookOutlined />}>
        Albums
      </Menu.Item>
      <Menu.Item key="2" icon={<SmileOutlined />}>
        Faces
      </Menu.Item>
      <Menu.Item key="9" icon={<CompassOutlined />}>
        Places
      </Menu.Item>
      <Menu.Item key="3" icon={<CameraOutlined />}>
        Cameras
      </Menu.Item>
      <Menu.Item key="4" icon={<FileSearchOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  </Sider>
)


export default SideMenu;
