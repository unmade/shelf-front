import React from 'react';

import * as icons from 'icons';

import Empty from 'components/photos/Empty';
import UploadButton from 'components/UploadButton';

interface Props {
  uploadTo: string;
}

export default function Welcome({ uploadTo }: Props) {
  return (
    <Empty
      title="Blank Canvas Awaits Your Moments"
      description={
        <>
          <p className="lg:hidden">To get started add your favorite photos</p>
          <p className="hidden lg:block">
            To get started drag and drop your favorite photos
            <br /> or
          </p>
          <div className="mt-8 lg:mt-3">
            <UploadButton
              icon={<icons.Upload className="h-4 w-4" />}
              uploadTo={uploadTo}
              size="base"
            >
              Upload
            </UploadButton>
          </div>
        </>
      }
    />
  );
}
