import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from 'antd';
import {
  BookOutlined,
  CameraOutlined,
  CloudUploadOutlined,
  CompassOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  PictureOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0" icon={<SettingOutlined />}>
      Settings
    </Menu.Item>
    <Menu.Item key="1" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
)


const SideMenu = () => ( 
  <Sider 
    theme="light"
    width={250}
    style={{
      borderRight: "1px solid #f0f0f0",
    }}
  >
    <Row style={{ height: '100%' }}>
      <Col span={24}>
        <Button
          type="primary"
          shape="round"
          icon={<CloudUploadOutlined />}
          size="large"
          style={{margin: '20px 10px', marginTop: '78px'}}
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
            <Link to="/files">Files</Link>
          </Menu.Item>
        </Menu>
      </Col>

      <Row gutter={16} align="bottom" style={{ width: '100%', margin: '20px 10px' }}>
        <Col span={24} style={{ paddingBottom: '10px' }}>
          <Dropdown overlay={menu} >
              <Space >
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>AM</Avatar>
                <Text>Aleksei</Text>
              </Space>
          </Dropdown>
        </Col>
      </Row>
    </Row>

  </Sider>
)


export default SideMenu;
