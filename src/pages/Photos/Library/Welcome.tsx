import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import type { UploadEntries } from '@/types/uploads';

import { useAppDispatch } from '@/hooks';

import { mediaItemEntriesAdded } from '@/store/uploads/slice';

import { UploadIcon } from '@/icons';

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/ui/empty';

import { UploadButton } from '@/components/Uploader/UploadButton';

export default function Welcome() {
  const { t } = useTranslation('photos');

  const dispatch = useAppDispatch();
  const handleFilesAdded = useCallback(
    (files: UploadEntries) => {
      dispatch(mediaItemEntriesAdded({ files }));
    },
    [dispatch],
  );

  const title = t('photos:pages.library.welcomeTitle', {
    defaultValue: 'Blank Canvas Awaits Your Moments',
  });

  const description = t('photos:pages.library.welcomeDescription', {
    defaultValue: 'To get started upload your favorite photos',
  });

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <UploadButton onFilesAdded={handleFilesAdded}>
          <UploadIcon />
          {t('photos:actions.upload', { defaultValue: 'Upload' })}
        </UploadButton>
      </EmptyContent>
    </Empty>
  );
}
