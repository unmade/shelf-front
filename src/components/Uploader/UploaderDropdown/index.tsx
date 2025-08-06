import { useEffect, useRef, useState } from 'react';

import {
  Popover as UIPopover,
  PopoverButton as UIPopoverButton,
  PopoverPanel as UIPopoverPanel,
} from '@headlessui/react';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import { selectIsUploading } from 'store/uploads/slice';

import Button from 'components/ui/Button';

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
    <UIPopover>
      <UIPopoverButton
        className="focus:outline-none"
        onClick={() => setOpen(!open)}
        ref={buttonRef}
      >
        <Button as="div">
          <icons.CloudUpload data-slot="icon" />
        </Button>
      </UIPopoverButton>
      <UIPopoverPanel
        anchor="bottom end"
        transition
        className={[
          'max-w-2xs rounded-2xl',
          'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
          'ring-1 ring-zinc-950/10 dark:ring-white/10',
          'origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
          '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
        ].join(' ')}
      >
        <Overlay allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />
      </UIPopoverPanel>
    </UIPopover>
  );
}
