import React, { useEffect } from 'react';

import { useAppSelector } from 'hooks';
import * as icons from 'icons';

import { selectIsUploading } from 'store/uploads/slice';

import Button from 'components/ui/Button';

import UploadDialog from './UploadDialog';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDialog({ allowedMediaTypes, uploadTo }: Props) {
  const [visible, setVisible] = React.useState(false);

  const uploading = useAppSelector(selectIsUploading);

  useEffect(() => {
    if (uploading && !visible) {
      setVisible(true);
    }
  }, [uploading]);

  return (
    <>
      <Button
        as="div"
        variant="primary"
        title="Uploads"
        size="base"
        icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
        onClick={() => {
          setVisible(true);
        }}
      />
      <UploadDialog
        allowedMediaTypes={allowedMediaTypes}
        uploadTo={uploadTo}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
