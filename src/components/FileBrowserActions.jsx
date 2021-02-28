import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Uploader from '../containers/Uploader';

import Dropdown from './ui/Dropdown';

const menu = [
  {
    name: 'New Folder',
    icon: <icons.NewFolder className="w-6 h-6" />,
  },
];

function FileBrowserActions({ hasUploads, onCreateFolder }) {
  return (
    <div className="flex flex-row space-x-4 align-middle text-gray-700">
      {/* {(hasUploads) && ( */}
        <Dropdown visible={hasUploads} overlay={() => (<Uploader />)}>
          <button type="button" title="Uploads" className="animate-pulse p-1 rounded-md hover:bg-gray-100">
            <icons.CloudUpload className="w-6 h-6" />
          </button>
        </Dropdown>
      {/* )} */}
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="p-1 rounded-md hover:bg-gray-100"
          title={item.name}
          onClick={() => {
            onCreateFolder();
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

FileBrowserActions.propTypes = {
  hasUploads: PropTypes.bool.isRequired,
  onCreateFolder: PropTypes.func.isRequired,
};

export default FileBrowserActions;
