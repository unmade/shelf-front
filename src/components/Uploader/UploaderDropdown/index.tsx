import { useEffect, useRef, useState } from 'react';

import { Slot } from '@radix-ui/react-slot';

import type { UploadEntries, UploadScope } from '@/types/uploads';

import { useAppSelector } from '@/hooks';

import { selectIsUploading } from '@/store/uploads/slice';

import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import Overlay from './Overlay';

interface Props {
  children: React.ReactNode;
  onFilesAdded: (files: UploadEntries) => void;
  uploadScope: UploadScope;
}

export default function UploaderDropdown({ children, onFilesAdded, uploadScope }: Props) {
  const [open, setOpen] = useState(false);

  const uploading = useAppSelector((state) => selectIsUploading(state, uploadScope));

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const shouldClick = uploading && !open;

  useEffect(() => {
    if (shouldClick) {
      buttonRef.current?.click();
    }
  }, [shouldClick]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Slot onClick={handleOpen} ref={buttonRef}>
          {children}
        </Slot>
      </PopoverTrigger>
      <PopoverContent className="w-sm" side="bottom" sideOffset={8} align="end">
        <Overlay onFilesAdded={onFilesAdded} uploadScope={uploadScope} />
      </PopoverContent>
    </Popover>
  );
}
