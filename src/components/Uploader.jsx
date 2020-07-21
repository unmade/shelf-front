import React from 'react';
import PropTypes from 'prop-types';

import UploaderItem from '../containers/UploaderItem';

const maxHeight = {
  maxHeight: '75vh',
};

const minWidth = {
  minWidth: '16rem',
};

function Uploader({ uploads }) {
  return (
    <div className="bg-white rounded shadow" style={minWidth}>
      <div className="flex flex-row justify-between p-2 text-sm">
        <p className="px-2">Uploads</p>
        <button type="button" className="px-2 text-blue-600">
          clear all
        </button>
      </div>

      {(uploads.length) ? (
        <div className="p-4 overflow-scroll" style={maxHeight}>
          {uploads.map((uploadId) => (
            <UploaderItem key={uploadId} uniqueKey={uploadId} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-sm font-semibold">
          No uploads yet
        </div>
      )}
    </div>
  );
}

Uploader.propTypes = {
  uploads: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Uploader;
