import React, { useEffect } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { selectIsUploading } from '@/store/uploads/slice';

import { useAppSelector } from '@/hooks';

import UploadDialog from './UploadDialog';

interface Props {
  allowedMediaTypes?: string[];
  children: React.ReactNode;
  uploadTo: string;
}

export default function UploaderDialog({ allowedMediaTypes, children, uploadTo }: Props) {
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
      <Slot onClick={handleOpen}>{children}</Slot>
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
