import React from 'react';
import {
  Card,
  Col,
  Divider,
  Layout,
  PageHeader,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import {
  FileImageOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Link, Paragraph, Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'Modified',
    dataIndex: 'modifiedAt',
  },
];


const data = [
  {
    key: 1,
    name: (
      <Space>
        <FolderOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Link>25 лет выпуск 2008 С-П-бург сентябрь</Link>
      </Space>
    ),
    size: <Text type="secondary">367.2 MB</Text>,
    modifiedAt: <Text type="secondary">11 days ago</Text>,
  },
  {
    key: 2,
    name: (
      <Space>
        <FolderOutlined style={{fontSize: '24px', color: '#1890ff'}} />
        <Link>Алексей</Link>
      </Space>
    ),
    size: <Text type="secondary">1.2 GB</Text>,
    modifiedAt: <Text type="secondary">3 days ago</Text>,
  },
  {
    key: 3,
    name: (
      <Space>
        <FolderOutlined style={{fontSize: '24px', color: '#1890ff'}} />
        <Link>Ваня и Таня</Link>
      </Space>
    ),
    size: <Text type="secondary">118.2 MB</Text>,
    modifiedAt: <Text type="secondary">4 days ago</Text>,
  },
  {
    key: 4,
    name: (
      <Space>
        <FolderOutlined style={{fontSize: '24px', color: '#1890ff'}} />
        <Link>Гараж</Link>
      </Space>
    ),
    size: <Text type="secondary">1.1 MB</Text>,
    modifiedAt: <Text type="secondary">11 days ago</Text>,
  },
  {
    key: 5,
    name: (
      <Space>
        <FileImageOutlined style={{ fontSize: '24px' }}/>
        IMG_2408.jpg 
      </Space>
    ),
    size: <Text type="secondary"> 340 KB</Text>,
    modifiedAt: <Text type="secondary">1 day ago</Text>,
  }
];


const routes = [
  {
    path: 'index',
    breadcrumbName: 'Archive',
  },
  {
    path: 'first',
    breadcrumbName: 'Photos',
  },
];


const Files = () => ( 
  <Layout style={{ background: 'white' }}>
    <Content style={{ margin: '0 16px' }}>
      <PageHeader
        title="Photos"
        subTitle="4 folders & 1 file"
        breadcrumb={{ routes }}
        style={{ paddingTop: '78px' }}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{}}
      />
    </Content>

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

  </Layout>
)


export default Files;
