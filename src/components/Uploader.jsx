import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Upload from '../containers/Upload';
import UploaderItem from '../containers/UploaderItem';

import Pill from './ui/Pill';

const maxHeight = {
  maxHeight: '50vh',
};

function Uploader({ uploads }) {
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
            <Upload className="px-2 py-1 font-semibold bg-blue-500 text-white rounded-md">
              <div className="flex flex-row items-center space-x-2">
                <icons.Upload />
                <p className="text-sm">
                  Browse
                </p>
              </div>
            </Upload>
          </div>
        </div>

      </div>

      <div className="mt-6 space-y-4">
        <p className="font-semibold">
          Recent Uploads
        </p>

        {(uploads.length > 0) ? (
          <div className="text-xs overflow-scroll" style={maxHeight}>
            {uploads.map((uploadId) => (
              <div key={uploadId} className="p-4 hover:bg-gray-100 rounded-lg">
                <UploaderItem uniqueKey={uploadId} />
              </div>
            ))}
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
  uploads: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Uploader;
