import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import UploadButton from '../containers/UploadButton';
import UploadList from '../containers/UploadList';
import UploadListItem from '../containers/UploadListItem';

import Pill from './ui/Pill';

const maxHeight = {
  maxHeight: '50vh',
};

const height = {
  height: '50vh',
};

function Uploader({ uploadCount }) {
  const virtual = uploadCount > 10;
  return (
    <div className="w-96 p-4 bg-white rounded shadow text-gray-700">

      <div className="flex flex-col items-center justify-center">

        <div className="w-full p-4 border-2 border-dashed rounded-md bg-gray-100 flex flex-row items-center justify-center space-x-6">
          <icons.CloudUploadOutlined className="w-12 h-12 text-gray-400" />
          <div className="flex flex-col text-center">
            <p className="text-sm font-semibold text-gray-600">
              Drag files here
            </p>
            <p className="text-sm text-gray-400">
              or
            </p>
            <UploadButton className="px-2 py-1 font-semibold bg-blue-500 text-white rounded-md">
              <div className="flex flex-row items-center space-x-2">
                <icons.Upload />
                <p className="text-sm">
                  Browse
                </p>
              </div>
            </UploadButton>
          </div>
        </div>

      </div>

      <div className="mt-6 space-y-4">
        <p className="font-semibold">
          Recent Uploads
        </p>

        {(uploadCount > 0) ? (
          <div className="text-xs" style={(virtual) ? height : maxHeight}>
            <UploadList
              itemRender={UploadListItem}
              virtual={virtual}
            />
          </div>
        ) : (
          <div className="h-20 text-gray-600 flex flex-row items-center justify-center space-x-2">
            <icons.Collection className="w-6 h-6 text-gray-500" />
            <p className="text-sm">
              No recents
            </p>
          </div>
        )}

        <div className="pt-2 text-xs border-t border-solid flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <Pill title="Show all uploads" active>
              All
            </Pill>
            <Pill title="Show all In-Progress uploads">
              In-Progress
            </Pill>
            <Pill title="Show failed uploads">
              Failed
            </Pill>
          </div>
          <button
            type="button"
            title="Clear"
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <icons.Clear className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

Uploader.propTypes = {
  uploadCount: PropTypes.number.isRequired,
};

export default Uploader;
