import { useTranslation } from 'react-i18next';

import { UploadIcon } from '@/icons';

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/ui/empty';

import { UploadButton } from '@/apps/files/components/upload-button';

interface Props {
  uploadTo: string;
}

export default function Welcome({ uploadTo }: Props) {
  const { t } = useTranslation('photos');

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
        <UploadButton uploadTo={uploadTo}>
          <UploadIcon />
          {t('photos:actions.upload', { defaultValue: 'Upload' })}
        </UploadButton>
      </EmptyContent>
    </Empty>
  );
}
