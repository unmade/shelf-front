import { useEffect, useRef, useState } from 'react';

import * as icons from '@/icons';

import { useAppSelector } from '@/hooks';

import { selectIsUploading } from '@/store/uploads/slice';

import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import Overlay from './Overlay';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDropdown({ allowedMediaTypes = undefined, uploadTo }: Props) {
  const [open, setOpen] = useState(false);

  const uploading = useAppSelector(selectIsUploading);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const shouldClick = uploading && !open;

  useEffect(() => {
    if (shouldClick) {
      buttonRef.current?.click();
    }
  }, [shouldClick]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => setOpen(!open)} ref={buttonRef}>
          <icons.CloudUpload />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm" side="bottom" sideOffset={8} align="end">
        <Overlay allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />
      </PopoverContent>
    </Popover>
  );
}
