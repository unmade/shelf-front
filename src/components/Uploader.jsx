import React from 'react';
import PropTypes from 'prop-types';

import UploaderItem from '../containers/UploaderItem';

const maxHeight = {
  maxHeight: '75vh',
};

const minWidth = {
  minWidth: '18rem',
};

function Uploader({ uploads }) {
  return (
    <div className="bg-white rounded shadow text-gray-700" style={minWidth}>
      <div className="flex flex-row justify-between p-2 text-sm">
        <p className="px-2">Uploads</p>
        <button type="button" className="px-2 text-blue-600">
          clear all
        </button>
      </div>

      <div className="pb-2 text-xs overflow-scroll" style={maxHeight}>
        {uploads.map((uploadId) => (
          <div key={uploadId} className="mx-2 p-4 hover:bg-gray-100 rounded-lg">
            <UploaderItem uniqueKey={uploadId} />
          </div>
        ))}
      </div>
    </div>
  );
}

Uploader.propTypes = {
  uploads: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Uploader;
