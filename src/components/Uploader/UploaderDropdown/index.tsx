import React, { useEffect, useState } from 'react';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import { selectIsUploading } from 'store/uploads/slice';

import Dropdown from 'components/ui-legacy/Dropdown';
import Button from 'components/ui-legacy/Button';

import Overlay from './Overlay';

const buttonClasses = [
  'animate-gradient bg-linear-to-br',
  'from-indigo-400 via-purple-400 to-blue-400',
  'bg-size-[400%_400%]',
  'hover:from-indigo-300 hover:via-purple-300 hover:to-blue-300',
].join(' ');

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDropdown({ allowedMediaTypes = undefined, uploadTo }: Props) {
  const [open, setOpen] = useState(false);

  const uploading = useAppSelector(selectIsUploading);

  const buttonRef = React.useRef<HTMLDivElement>();

  const shouldClick = uploading && !open;

  useEffect(() => {
    if (shouldClick) {
      buttonRef.current?.click();
    }
  }, [shouldClick]);

  return (
    <Dropdown
      overlay={<Overlay allowedMediaTypes={allowedMediaTypes} uploadTo={uploadTo} />}
      onOpenChange={setOpen}
    >
      <Button
        innerRef={buttonRef}
        className={uploading ? buttonClasses : ''}
        as="div"
        variant="primary"
        title="Uploads"
        size="lg"
        icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
      />
    </Dropdown>
  );
}
