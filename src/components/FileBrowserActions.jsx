import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Uploader from '../containers/Uploader';

import Button from './ui/Button';
import Dropdown from './ui/Dropdown';
import Menu from './ui/Menu';
import UploadDialog from './UploadDialog';

function ActionsDropdown({ menu }) {
  const [uploaderVisible, setUploaderVisible] = React.useState(false);
  const items = [
    {
      name: 'Uploads',
      icon: <icons.CloudUpload className="text-lg" />,
      onClick: () => { setUploaderVisible(true); },
    },
    ...menu,
  ];
  return (
    <>
      <Menu
        panelClassName="min-w-max"
        items={items}
        itemRender={({ item }) => (
          <Button
            type="text"
            size="sm"
            icon={item.icon}
            title={item.name}
            onClick={item.onClick}
          >
            {item.name}
          </Button>
        )}
      >
        <Button
          as="div"
          type="text"
          title="Actions"
          size="lg"
          icon={<icons.More />}
        />
      </Menu>
      {(uploaderVisible) && (
        <span>
          <UploadDialog
            visible={uploaderVisible}
            onCancel={() => { setUploaderVisible(false); }}
          />
        </span>
      )}
    </>
  );
}

function Actions({ menu }) {
  return (
    <div className="inline-flex items-center space-x-4">
      <Dropdown overlay={Uploader}>
        <Button
          as="div"
          type="text"
          title="Uploads"
          size="lg"
          icon={<icons.CloudUpload />}
        />
      </Dropdown>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          size="lg"
          icon={item.icon}
          title={item.name}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

function FileBrowserActions({ collapsed, onCreateFolder }) {
  const menu = [
    {
      name: 'New Folder',
      icon: <icons.NewFolder className="text-lg" />,
      onClick: onCreateFolder,
    },
  ];

  if (collapsed) {
    return <ActionsDropdown menu={menu} />;
  }
  return <Actions menu={menu} />;
}

FileBrowserActions.propTypes = {
  collapsed: PropTypes.bool,
  onCreateFolder: PropTypes.func.isRequired,
};

FileBrowserActions.defaultProps = {
  collapsed: false,
};

export default FileBrowserActions;
