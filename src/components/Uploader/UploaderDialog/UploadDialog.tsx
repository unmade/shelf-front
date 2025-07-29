import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import Dialog from 'components/ui/Dialog';

import UploadButton from 'components/UploadButton';

import RecentUploads from '../RecentUploads';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
  visible: boolean;
  onCancel: () => void;
}

export default function UploadDialog({ allowedMediaTypes, uploadTo, visible, onCancel }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog
      title={t('Uploads')}
      icon={<icons.CloudUploadOutlined className="h-6 w-6" />}
      confirmTitle={t('Browse')}
      confirmRender={
        <UploadButton allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} full>
          {t('Browse')}
        </UploadButton>
      }
      visible={visible}
      onCancel={onCancel}
    >
      <RecentUploads />
    </Dialog>
  );
}
