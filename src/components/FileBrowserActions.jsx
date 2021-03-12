import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Uploader from '../containers/Uploader';

import Button from './ui/Button';
import Dropdown from './ui/Dropdown';

const menu = [
  {
    name: 'New Folder',
    icon: <icons.NewFolder className="w-5 h-5" />,
  },
];

function FileBrowserActions({ onCreateFolder }) {
  return (
    <div className="flex flex-row space-x-4 align-middle text-gray-700">
      <Dropdown overlay={() => (<Uploader />)}>
        <Button
          type="text"
          title="Uploads"
          icon={<icons.CloudUpload className="w-5 h-5" />}
        />
      </Dropdown>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          icon={item.icon}
          title={item.name}
          onClick={() => {
            onCreateFolder();
          }}
        />
      ))}
    </div>
  );
}

FileBrowserActions.propTypes = {
  onCreateFolder: PropTypes.func.isRequired,
};

export default FileBrowserActions;
