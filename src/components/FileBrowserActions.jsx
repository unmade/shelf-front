import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

const menu = [
  {
    name: 'New Folder',
    icon: <icons.NewFolder />,
  },
];

function FileBrowserActions({ onCreateFolder }) {
  return (
    <div className="w-40 text-sm text-gray-700 p-2 bg-white py-2 rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="w-full rounded px-4 py-2 hover:bg-gray-100"
          onClick={onCreateFolder}
        >
          <div className="flex flex-row items-center space-x-4">
            <p className="text-left flex-1">
              {item.name}
            </p>
            {item.icon}
          </div>
        </button>
      ))}
    </div>
  );
}

FileBrowserActions.propTypes = {
  onCreateFolder: PropTypes.func.isRequired,
};

export default FileBrowserActions;
