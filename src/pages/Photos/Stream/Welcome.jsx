import React from 'react';

import * as icons from '../../../icons';

import UploadButton from '../../../components/UploadButton';

function Welcome({ uploadTo }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="mt-4 px-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-zinc-200">
        Blank Canvas Awaits Your Moments
      </p>
      <div className="mt-4 mb-8 lg:mb-3 text-base sm:text-lg lg:text-xl font-light">
        <p className="lg:hidden">To get started add your favorite photos</p>
        <p className="hidden lg:block">
          To get started drag and drop your favorite photos
          <br /> or
        </p>
      </div>
      <UploadButton
        icon={<icons.Upload className="w-4 h-4" />}
        uploadTo={uploadTo}
        full
        size="base"
      >
        Upload
      </UploadButton>
    </div>
  );
}

export default Welcome;
