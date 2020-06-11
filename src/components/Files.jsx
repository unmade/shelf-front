import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  PageHeader,
  Space,
  Table,
  Typography,
} from "antd";
import {
  FileImageOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

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


function Folder({ name }) {
  let { url } = useRouteMatch();

  return (
    <Space>
      <FolderOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
      <Link to={`${url}/${name}`} component={Typography.Link}>
        {name}
      </Link>
    </Space>
  )
}


function File({ name }) {
  return (
    <Space>
      <FileImageOutlined style={{ fontSize: '24px' }} />
      <Text style={{ cursor: 'pointer' }}>
        {name}
      </Text>
    </Space>
  )
}


function breadcrumbs(path) {
  const parts = path.split("/").filter((e) => e !== "");

  return parts.map((item) => ({
    path: item,
    breadcrumbName: item,
  }));
}


function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/files/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
}


function Files({ directory, files }) {
  let routes = breadcrumbs(directory.path);

  return (
    <div>
      <PageHeader
        title={directory.name}
        subTitle={`${directory.folderCount} folders & ${directory.fileCount} file`}
        breadcrumb={{ routes, itemRender }}
        style={{ paddingTop: '68px' }}
      />
      <Table
        columns={columns}
        dataSource={files.map((item) => ({
          key: item.name,
          name: (item.type === "folder") ? (
            <Folder name={item.name} />
          ): (
            <File name={item.name} />
          ),
          size: <Text type="secondary">{item.size}</Text>,
          modifiedAt: <Text type="secondary">{item.modifiedAt}</Text>,
        }))}
        pagination={false}
        rowSelection={{}}
      />
    </div>
  )
}

export default Files;
