import React from 'react';

import * as icons from '../icons';

import ProgressBar from './ProgressBar';

function UploaderItem({ item }) {
  const { name, progress } = item;
  return (
    <div>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2">
            {name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block">
            {(progress < 100) ? (
              `${progress}%`
            ) : (
              <icons.CheckCircle className="text-green-500" />
            )}
          </span>
        </div>
      </div>

      <ProgressBar progress={progress} />
    </div>
  );
}

export default UploaderItem;
