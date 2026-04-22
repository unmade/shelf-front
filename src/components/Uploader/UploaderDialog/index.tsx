import React, { useEffect } from 'react';

import { Slot } from '@radix-ui/react-slot';

import type { UploadEntries, UploadScope } from '@/types/uploads';

import { selectIsUploading } from '@/store/uploads/slice';

import { useAppSelector } from '@/hooks';

import UploadDialog from './UploadDialog';

interface Props {
  children: React.ReactNode;
  onFilesAdded: (files: UploadEntries) => void;
  uploadScope: UploadScope;
}

export default function UploaderDialog({ children, onFilesAdded, uploadScope }: Props) {
  const [open, setOpen] = React.useState(false);

  const uploading = useAppSelector((state) => selectIsUploading(state, uploadScope));

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
        onFilesAdded={onFilesAdded}
        uploadScope={uploadScope}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
