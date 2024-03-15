import React from 'react';

import * as icons from 'icons';

import Empty from 'components/photos/Empty';
import UploadButton from 'components/UploadButton';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  uploadTo: string;
}

export default function Welcome({ uploadTo }: Props) {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.library.welcomeTitle', {
    defaultValue: 'Blank Canvas Awaits Your Moments',
  });

  const descriptionTouch = t('photos:pages.library.welcomeDescription.touch', {
    defaultValue: 'To get started add your favorite photos',
  });
  const descriptionPointer = (
    <Trans i18nKey="photos:pages.library.welcomeDescription.pointer">
      To get started drag and drop your favorite photos
      <br />
      or
    </Trans>
  );

  return (
    <Empty
      title={title}
      description={
        <>
          <p className="lg:hidden">{descriptionTouch}</p>
          <p className="hidden lg:block">{descriptionPointer}</p>
          <div className="mt-8 lg:mt-3">
            <UploadButton
              icon={<icons.Upload className="h-4 w-4" />}
              uploadTo={uploadTo}
              size="base"
            >
              {t('photos:actions.upload', { defaultValue: 'Upload' })}
            </UploadButton>
          </div>
        </>
      }
    />
  );
}
