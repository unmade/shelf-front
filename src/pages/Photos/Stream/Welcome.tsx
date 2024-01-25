import React from 'react';

import * as icons from 'icons';

import UploadButton from 'components/UploadButton';

interface Props {
  uploadTo: string;
}

export default function Welcome({ uploadTo }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="mt-4 px-2 text-xl font-semibold text-gray-800 dark:text-zinc-200 sm:text-2xl lg:text-3xl">
        Blank Canvas Awaits Your Moments
      </p>
      <div className="mb-8 mt-4 text-base font-light sm:text-lg lg:mb-3 lg:text-xl">
        <p className="lg:hidden">To get started add your favorite photos</p>
        <p className="hidden lg:block">
          To get started drag and drop your favorite photos
          <br /> or
        </p>
      </div>
      <UploadButton
        icon={<icons.Upload className="h-4 w-4" />}
        uploadTo={uploadTo}
        full
        size="base"
      >
        Upload
      </UploadButton>
    </div>
  );
}
