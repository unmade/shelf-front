import React from 'react';
import {
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Typography,
} from 'antd';

const { Sider } = Layout;
const { Paragraph, Text } = Typography;


function FilesSider() {
  return (
    <Sider theme="light" width={350} style={{ borderLeft: '1px solid #f0f0f0' }}>
      <Card
        bordered={false}
        className="sidebar-preview"
        cover={
          <img
            style={{ borderRadius: '7px' }}
            alt="example"
            src="https://images.unsplash.com/photo-1478034182233-3f6bb5db41ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80"
          />
        }
      >
        <Card.Meta
          title={
            <Divider orientation="left">
              <Text>IMG_2048.jpg</Text>
            </Divider>
          } 
        />
        <Row style={{ textAlign: 'center' }}>
          <Col span={24}>
            <Text strong>9 June 2020</Text>
          </Col>
          <Col span={24}>
            <Text >Tuesday, 17:58</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">1440 × 900</Text>
            <Divider type="vertical" />
            <Text type="secondary">340 KB</Text>
          </Col>
        </Row>

        <Row style={{ textAlign: 'center' }}>
          <Col span={24}>
            <Divider orientation="left">
              <Text>iPhone 8</Text>
            </Divider>
          </Col>
          <Col span={24}>
            <Text type="secondary">ISO 25</Text>
            <Divider type="vertical" />
            <Text type="secondary">3.99mm</Text>
            <Divider type="vertical" />
            <Text type="secondary">ƒ/1.8</Text>
            <Divider type="vertical" />
            <Text type="secondary">1/130s</Text>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Divider orientation="left">
              <Text>Notes</Text>
            </Divider>
          </Col>
          <Col span={24}>
            <Paragraph editable={{}} />
          </Col>
        </Row>
      </Card>
    </Sider>
  )
}


export default FilesSider;
