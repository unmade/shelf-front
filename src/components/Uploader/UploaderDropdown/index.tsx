import { useEffect, useRef, useState } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { useAppSelector } from '@/hooks';

import { selectIsUploading } from '@/store/uploads/slice';

import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import Overlay from './Overlay';

interface Props {
  allowedMediaTypes?: string[];
  children: React.ReactNode;
  uploadTo: string;
}

export default function UploaderDropdown({ allowedMediaTypes, children, uploadTo }: Props) {
  const [open, setOpen] = useState(false);

  const uploading = useAppSelector(selectIsUploading);

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
        <Overlay allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />
      </PopoverContent>
    </Popover>
  );
}
