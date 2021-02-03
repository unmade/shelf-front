import React from 'react';

import * as icons from '../icons';

import ProgressBar from './ui/ProgressBar';

const styles = {
  padding: '0.25rem',
  fontSize: '0.5rem',
};

function UploaderItem({ item }) {
  const { name, progress, error } = item;
  return (
    <div className="flex flex-row items-center space-x-4">
      <div>
        <icons.File className="text-gray-400 w-6 h-6" />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="font-semibold pr-12">
            {name}
          </div>
          <div className="text-right text-sm">
            {(error) ? (
              <icons.CrossCircle className="text-red-500" />
            ) : (
              <div className="font-semibold">
                {(progress < 100) ? (
                  `${progress}%`
                ) : (
                  <icons.CheckCircle className="text-green-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {(error) ? (
          <div className="flex flex-row text-red-500 space-x-2">
            <div>Upload failed</div>
            <button
              type="button"
              title="Retry"
              className="w-4 h-4 bg-gray-300 text-gray-500 rounded-full"
              style={styles}
            >
              <icons.Redo />
            </button>
            <hr />
          </div>
        ) : (
          <ProgressBar progress={progress} />
        )}
      </div>
    </div>
  );
}

export default UploaderItem;
