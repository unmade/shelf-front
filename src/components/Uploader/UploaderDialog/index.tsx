import React, { useEffect } from 'react';

import { selectIsUploading } from '@/store/uploads/slice';

import { useAppSelector } from '@/hooks';
import * as icons from '@/icons';

import { Button } from '@/ui/button';

import UploadDialog from './UploadDialog';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDialog({ allowedMediaTypes, uploadTo }: Props) {
  const [open, setOpen] = React.useState(false);

  const uploading = useAppSelector(selectIsUploading);

  const shouldBeOpen = uploading && !open;

  useEffect(() => {
    if (shouldBeOpen) {
      setOpen(true);
    }
  }, [shouldBeOpen]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button title="Uploads" size="icon" onClick={handleOpen}>
        <icons.CloudUpload />
      </Button>
      <UploadDialog
        allowedMediaTypes={allowedMediaTypes}
        uploadTo={uploadTo}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
